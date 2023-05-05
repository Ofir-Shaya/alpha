// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function fmtMSS(s) {
  return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;
}

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      handlePOST(req, res);
      break;
    case "GET":
      handleGET(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "PATCH", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function handleGET(req, res) {
  try {
    let data;
    switch (req.query.func) {
      case "searchPlayer":
        data = await searchPlayer(req.query.user);
        res.status(200).json(data);

        break;
      case "playerMastery":
        data = await playerMastery(req.query.id);
        res.status(200).json(data);

        break;
      case "getPlayerRankedInfo":
        data = await getPlayerRankedInfo(req.query.summonerName);
        res.status(200).json(data);

        break;
      case "getRankedInformation":
        data = await getRankedInformation(req.query.summonerName);
        res.status(200).json(data);

        break;
      case "getAllMatchesByPuuid":
        data = await getAllMatchesByPuuid(req.query.puuid);
        res.status(200).json(data);

        break;
      case "analyzeMatch":
        data = await analyzeMatch(req.query.matchId);
        res.status(200).json(data);

        break;
      case "updateAllUsersOfMatches":
        data = await updateAllUsersOfMatches(req.query.matches);
        res.status(200).json(data);

        break;
      case "updateUser":
        data = await updateUser(req.query.summonerName);
        res.status(200).json(data);

        break;
      case "getPlayerChamps":
        data = await getPlayerChamps(req.query.summonerId);
        res.status(200).json(data);

        break;
      case "getMatchInformation":
        data = await getMatchInformation(req.query.match);
        res.status(200).json(data);

        break;
      case "getAllMatches":
        data = await getAllMatches();
        res.status(200).json(data);

        break;
      case "updatePlayerMatchInfo":
        data = await updatePlayerMatchInfo(req.query.matchId);
        res.status(200).json(data);

        break;

      default:
        console.error("bad query func");
        break;
    }
    return data;
  } catch (error) {
    return res.status(500).json(error);
  }
}

async function handlePOST(req, res, player) {
  try {
    const token = await getToken({ req });
    console.log(token);
    await prisma.user.create({
      data: {
        puuid: player.puuid,
        username: player.name,
      },
    });
    res.status(200).send();
  } catch (error) {
    return res.status(500).json(error);
  }
}

async function searchPlayer(playerName) {
  try {
    const existingProfile = await prisma.profile.findUnique({
      where: {
        username: playerName,
      },
    });

    if (existingProfile) {
      return existingProfile;
    } else createPlayer(playerName);
    // fetch the player data from the API if can't find
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.log("Player doesn't exist.");
    } else {
      console.error(error);
    }
  }
}

async function createPlayer(playerName) {
  try {
    const response = await axios.get(
      `https://eun1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${playerName}`,
      {
        headers: {
          "X-Riot-Token": process.env.API_KEY,
        },
      }
    );
    const player = response.data;
    // create a new profile record for the player in the database
    await prisma.profile.create({
      data: {
        username: player.name,
        puuid: player.puuid,
        summonerLevel: player.summonerLevel,
        profileIconId: player.profileIconId,
      },
    });
    return player;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.log("Player doesn't exist.");
    } else {
      console.error(error);
    }
  }
}

async function getPlayerRankedInfo(summonerName) {
  try {
    const responseProfile = await axios.get(
      `https://eun1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`,
      {
        headers: {
          "X-Riot-Token": process.env.API_KEY,
        },
      }
    );

    const summonerProfile = responseProfile.data;
    const response = await axios.get(
      `https://eun1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerProfile.id}`,
      {
        headers: {
          "X-Riot-Token": process.env.API_KEY,
        },
      }
    );

    const playerRankedArray = response.data;
    let soloqIndex;

    for (let index = 0; index < playerRankedArray.length; index++) {
      const player = playerRankedArray[index];
      if (player.queueType === "RANKED_SOLO_5x5") {
        soloqIndex = index;
        await prisma.RankedInformation.upsert({
          where: {
            summonerId: summonerProfile.id,
          },
          update: {
            tier: player.tier,
            rank: player.rank,
            leaguePoints: player.leaguePoints,
            wins: player.wins,
            losses: player.losses,
            veteran: player.veteran,
            inactive: player.inactive,
            freshBlood: player.freshBlood,
            hotStreak: player.hotStreak,
          },
          create: {
            summonerId: summonerProfile.id,
            queueType: player.queueType,
            tier: player.tier,
            rank: player.rank,
            leaguePoints: player.leaguePoints,
            wins: player.wins,
            losses: player.losses,
            veteran: player.veteran,
            inactive: player.inactive,
            freshBlood: player.freshBlood,
            hotStreak: player.hotStreak,
            profile: {
              connect: {
                puuid: summonerProfile.puuid,
              },
            },
          },
        });
      }
    }
    console.log(playerRankedArray[soloqIndex]);
    return playerRankedArray[soloqIndex];
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.log("Player doesn't exist.");
    } else {
      console.error(error);
    }
  }
}

async function getRankedInformation(username) {
  try {
    const data = await prisma.profile.findUnique({
      where: {
        username: username,
      },
      select: {
        rankedInformation: true,
      },
    });
    if (!data.rankedInformation) {
      const newData = await getPlayerRankedInfo(username);
      return newData;
    }
    return data.rankedInformation;
  } catch (error) {
    console.error(error);
  }
}

async function playerMastery(summonerId) {
  try {
    const response = await axios.get(
      `https://eun1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}`,
      {
        headers: {
          "X-Riot-Token": process.env.API_KEY,
        },
      }
    );
    const data = response.data;

    return data;
  } catch (error) {
    console.error(error);
  }
}

async function get10MatchesIdByPuuid(puuid, startIndex) {
  try {
    const response = await axios.get(
      `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?startTime=1673395201&queue=420&type=ranked&start=${startIndex}&count=5`,
      {
        headers: {
          "X-Riot-Token": process.env.API_KEY,
        },
      }
    );
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function getAllMatchesByPuuid(puuid) {
  const matchesArray = [];
  let startIndex = 0;
  let matchIds;
  try {
    do {
      matchIds = await get10MatchesIdByPuuid(puuid, startIndex);
      matchesArray.push(...matchIds);
      startIndex += matchIds.length;
    } while (matchIds.length === 10);
    return matchesArray;
  } catch (error) {
    console.error(error);
  }
}

async function analyzeMatch(matchId) {
  try {
    const response = await axios.get(
      `https://europe.api.riotgames.com/lol/match/v5/matches/${matchId}`,
      {
        headers: {
          "X-Riot-Token": process.env.API_KEY,
        },
      }
    );
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function updateAllUsersOfMatches(matchesArray) {
  const matches =
    typeof matchesArray === "string"
      ? matchesArray.split(",")
      : [...matchesArray];

  try {
    for (const match of matches) {
      //TEST IF ALREADY EXIST
      const uniqueMatch = await prisma.match.findUnique({
        where: {
          id: match,
        },
      });

      // Needs matchData for both cases of uniqueMatch
      const matchData = await analyzeMatch(match);

      if (!uniqueMatch) {
        // Create Match
        const match = await prisma.match.create({
          data: {
            id: matchData.metadata.matchId,
            queueId: matchData.info.queueId,
            gameVersion: matchData.info.gameVersion,
            gameMode: matchData.info.gameMode,
            mapId: matchData.info.mapId,
            gameCreation: matchData.info.gameCreation,
            gameDuration: fmtMSS(matchData.info.gameDuration),
          },
        });
      }

      // Create PlayerMatchStats for each player in the match
      for (const participant of matchData.info.participants) {
        const profile = await prisma.profile.findUnique({
          where: {
            username: participant.summonerName,
          },
        });
        const player = await prisma.rankedInformation.findUnique({
          where: {
            summonerId: participant.summonerId,
          },
        });

        // Create player info if doesn't exist
        let newProfile;
        if (!profile) {
          newProfile = await createPlayer(participant.summonerName);
        }

        let playerRanked;
        if (!player) {
          playerRanked = await getRankedInformation(participant.summonerName);
        }

        const champion = await prisma.champions.findUnique({
          where: {
            id: participant.championId,
          },
        });

        const uniqueParticipant = await prisma.playerMatchStats.findUnique({
          where: {
            matchId_playerId: {
              matchId: matchData.metadata.matchId,
              playerId: participant.summonerId,
            },
          },
        });

        if (!profile && !newProfile) {
          console.error("Player not found");
          continue;
        }
        if (!playerRanked) {
          await prisma.playerMatchStats.create({
            data: {
              match: {
                connect: {
                  id: matchData.metadata.matchId,
                },
              },
              player: {
                connect: {
                  summonerId: participant.summonerId,
                },
              },
            },
          });

          await updateChamp(champion, participant);

          continue;
        }

        if (!uniqueParticipant) {
          await createParticipant(participant, matchData);
        }

        // Update Champion statistics
        await updateChamp(champion, participant);
      }
    }
  } catch (error) {
    console.error(error);
  }
}

async function updateOneUserFromMatches(matchesArray, summonerName) {
  const matches =
    typeof matchesArray === "string"
      ? matchesArray.split(",")
      : [...matchesArray];

  try {
    for (const match of matches) {
      //TEST IF ALREADY EXIST
      const uniqueMatch = await prisma.match.findUnique({
        where: {
          id: match,
        },
      });

      // Needs matchData for both cases of uniqueMatch
      const matchData = await analyzeMatch(match);

      if (!uniqueMatch) {
        // Create Match

        await prisma.match.create({
          data: {
            id: matchData.metadata.matchId,
            queueId: matchData.info.queueId,
            gameVersion: matchData.info.gameVersion,
            gameMode: matchData.info.gameMode,
            mapId: matchData.info.mapId,
            gameCreation: matchData.info.gameCreation,
            gameDuration: fmtMSS(matchData.info.gameDuration),
          },
        });
      }

      // Find player & Create PlayerMatchStats for player in the match

      let participant = null;
      for (const p of matchData.info.participants) {
        if (p.summonerName === summonerName) {
          participant = p;
          break;
        }
      }

      if (participant === null) {
        return null;
      }

      const profile = await prisma.profile.findUnique({
        where: {
          username: participant.summonerName,
        },
      });
      // Looks for player info
      const player = await prisma.rankedInformation.findUnique({
        where: {
          summonerId: participant.summonerId,
        },
      });

      // Create player info if doesn't exist
      let newProfile;
      let playerRanked;

      if (!profile) {
        newProfile = await createPlayer(participant.summonerName);
      }

      if (!player) {
        playerRanked = await getRankedInformation(participant.summonerName);
      }

      const champion = await prisma.champions.findUnique({
        where: {
          id: participant.championId,
        },
      });

      const uniqueParticipant = await prisma.playerMatchStats.findUnique({
        where: {
          matchId_playerId: {
            matchId: matchData.metadata.matchId,
            playerId: participant.summonerId,
          },
        },
      });

      if (!profile && !newProfile) {
        console.error("Player not found");
        continue;
      }
      if (!player && !playerRanked) {
        console.error("Player ranked not found");
        continue;
      }
      if (!champion) {
        console.error("Champion not found");
        continue;
      }

      if (!uniqueParticipant) {
        await createParticipant(participant, matchData);
      }

      // Update Champion statistics

      await updateChamp(champion, participant);
    }
  } catch (error) {
    console.error(error);
  }
}

async function updateUser(summonerName) {
  // Get or create if needed Player
  const player = await searchPlayer(summonerName);

  if (!player) {
    console.error("Player not found");
    return;
  }
  console.log("Player Found:", player);
  // Create player info if doesn't exist
  const playerRanked = await getRankedInformation(player.username);

  if (!playerRanked) {
    console.error("Player ranked not found");
    return;
  }
  console.log("Player Ranked Found:", playerRanked);

  const last10Matches = await get10MatchesIdByPuuid(player.puuid, 0);
  if (!last10Matches) {
    console.error("Player matches not found");
    return;
  }
  console.log("Player Matches Found:", last10Matches);

  // await updateOneUserFromMatches(last10Matches, summonerName);
  await updateAllUsersOfMatches(last10Matches);
  console.log(summonerName + " Profile was updated.");
  return playerRanked;
}

async function getPlayerChamps(summonerId) {
  const playerRanked = await prisma.RankedInformation.findUnique({
    where: { summonerId: summonerId },
    select: {
      playerMatchStats: true,
    },
  });
  if (!playerRanked) return null;
  return playerRanked.playerMatchStats;
}

async function updateChamp(champion, participant) {
  await prisma.champions.update({
    where: {
      id: champion.id,
    },
    data: {
      gamesPlayed: {
        increment: 1,
      },
      wins: {
        increment: participant.win ? 1 : 0,
      },
      losses: {
        increment: participant.win ? 0 : 1,
      },
      kills: {
        increment: participant.kills,
      },
      deaths: {
        increment: participant.deaths,
      },
      assists: {
        increment: participant.assists,
      },
      killingSprees: {
        increment: participant.killingSprees,
      },
      doubleKills: {
        increment: participant.doubleKills,
      },
      tripleKills: {
        increment: participant.tripleKills,
      },
      quadraKills: {
        increment: participant.quadraKills,
      },
      pentaKills: {
        increment: participant.pentaKills,
      },
      totalDamageDealtToChampions: {
        increment: participant.totalDamageDealtToChampions,
      },
      totalHeal: {
        increment: participant.totalHeal,
      },
      totalUnitsHealed: {
        increment: participant.totalUnitsHealed,
      },
      damageDealtToObjectives: {
        increment: participant.damageDealtToObjectives,
      },
      damageDealtToTurrets: {
        increment: participant.damageDealtToTurrets,
      },
      visionScore: {
        increment: participant.visionScore,
      },
      timeCCingOthers: {
        increment: participant.timeCCingOthers,
      },
      totalDamageTaken: {
        increment: participant.totalDamageTaken,
      },
      goldEarned: {
        increment: participant.goldEarned,
      },
      wardsPlaced: {
        increment: participant.wardsPlaced,
      },
      wardsKilled: {
        increment: participant.wardsKilled,
      },
      firstBloodKill: {
        increment: participant.firstBloodKill ? 1 : 0,
      },
      firstTowerKill: {
        increment: participant.firstTowerKill ? 1 : 0,
      },
      firstInhibitorKill: {
        increment: participant.firstInhibitorKill ? 1 : 0,
      },
      firstBaronKill: {
        increment: participant.firstBaronKill ? 1 : 0,
      },
      firstDragonKill: {
        increment: participant.firstDragonKill ? 1 : 0,
      },
      firstRiftHeraldKill: {
        increment: participant.firstRiftHeraldKill ? 1 : 0,
      },
      completeSupportQuestInTime: {
        increment: participant.completeSupportQuestInTime ? 1 : 0,
      },
    },
  });
}

async function createParticipant(participant, matchData) {
  await prisma.playerMatchStats.create({
    data: {
      win: participant.win,
      championName: participant.championName,
      spell1Id: participant.summoner1Id,
      spell2Id: participant.summoner2Id,
      item0: participant.item0,
      item1: participant.item1,
      item2: participant.item2,
      item3: participant.item3,
      item4: participant.item4,
      item5: participant.item5,
      item6: participant.item6,
      kills: participant.kills,
      deaths: participant.deaths,
      assists: participant.assists,
      doubleKills: participant.doubleKills,
      tripleKills: participant.tripleKills,
      quadraKills: participant.quadraKills,
      pentaKills: participant.pentaKills,
      totalDamageDealtToChampions: participant.totalDamageDealtToChampions,
      totalHeal: participant.totalHeal,
      totalHealsOnTeammates: participant.totalHealsOnTeammates,
      damageDealtToObjectives: participant.damageDealtToObjectives,
      damageDealtToTurrets: participant.damageDealtToTurrets,
      visionScore: participant.visionScore,
      champLevel: participant.champLevel,
      creepScore: participant.totalMinionsKilled,
      mainRune: participant.perks.styles[0].selections[0].perk,
      secondaryRune: participant.perks.styles[1].style,
      timeCCingOthers: participant.timeCCingOthers,
      totalDamageTaken: participant.totalDamageTaken,
      goldEarned: participant.goldEarned,
      wardsPlaced: participant.wardsPlaced,
      wardsKilled: participant.wardsKilled,
      firstBloodKill: participant.firstBloodKill,
      firstTowerKill: participant.firstTowerKill,
      firstInhibitorKill: Boolean(participant.firstInhibitorKill),
      firstBaronKill: Boolean(participant.firstBaronKill),
      firstDragonKill: Boolean(participant.firstDragonKill),
      firstRiftHeraldKill: Boolean(participant.firstRiftHeraldKill),
      completeSupportQuestInTime: Boolean(
        participant.completeSupportQuestInTime
      ),
      player: {
        connect: {
          summonerId: participant.summonerId,
        },
      },
      match: {
        connect: {
          id: matchData.metadata.matchId,
        },
      },
    },
  });
}

async function getMatchInformation(matchId) {
  const matchInfo = await prisma.match.findUnique({
    where: { id: matchId },
    select: {
      playerMatchStats: {
        playerId: true,
        championName: true,
      },
    },
  });
  console.log(matchInfo);
  return matchInfo;
}
