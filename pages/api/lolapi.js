// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
      case "playerRankedInfo":
        data = await playerRankedInfo(req.query.summonerId);
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
    console.log("Searching for player:", playerName);
    const existingProfile = await prisma.profile.findUnique({
      where: {
        username: playerName,
      },
    });

    if (existingProfile) {
      console.log("profile exists:", existingProfile);
      return existingProfile;
    } else {
      console.log("Player not found in database, trying to create.");

      // fetch the player data from the API
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
          summonerId: player.id,
          username: player.name,
          summonerLevel: player.summonerLevel,
          profileIconId: player.profileIconId,
        },
      });

      console.log("New player created in database:", player);
      return player;
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.log("Player doesn't exist.");
    } else {
      console.error(error);
    }
  }
}

async function playerRankedInfo(summonerId) {
  try {
    console.log("Searching for summonerId:", summonerId);
    const response = await axios.get(
      `https://eun1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}`,
      {
        headers: {
          "X-Riot-Token": process.env.API_KEY,
        },
      }
    );
    const profileId = await prisma.profile.findUnique({
      where: {
        summonerId: summonerId,
      },
    });
    const playerRankedArray = response.data;
    console.log(response.data);
    if (playerRankedArray.length === 1) {
      const player1 = playerRankedArray[0];
      await prisma.RankedInformation.create({
        data: {
          queueType: player1.queueType,
          tier: player1.tier,
          rank: player1.rank,
          summonerId: player1.summonerId,
          leaguePoints: player1.leaguePoints,
          wins: player1.wins,
          losses: player1.losses,
          veteran: player1.veteran,
          inactive: player1.inactive,
          freshBlood: player1.freshBlood,
          hotStreak: player1.hotStreak,
          profileId: profileId.id,
        },
      });
    } else if (playerRankedArray.length === 2) {
      // create multiple RankedInformation objects
      const data = playerRankedArray.map((player) => ({
        queueType: player.queueType,
        tier: player.tier,
        rank: player.rank,
        summonerId: player.summonerId,
        leaguePoints: player.leaguePoints,
        wins: player.wins,
        losses: player.losses,
        veteran: player.veteran,
        inactive: player.inactive,
        freshBlood: player.freshBlood,
        hotStreak: player.hotStreak,
        profileId: profileId.id,
      }));
      await prisma.rankedInformation.createMany({
        data,
      });
    } else {
      // Handle error case where the length is not 1 or 2
      console.error("Array length is not 1 or 2");
    }
    console.log("Player ranked information added:", playerRankedArray);
    return playerRankedArray;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.log("Player doesn't exist.");
    } else {
      console.error(error);
    }
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
    console.log(summonerId);
    const data = response.data;

    return data;
  } catch (error) {}
}
