// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from 'axios';

export default async function handler(req, res) {
    switch (req.method) {
        case 'POST':
            handlePOST(req, res);
            break;
        case 'GET':
            handleGET(req, res);
            break;
        default:
            res.setHeader('Allow', ['GET', 'PUT', 'PATCH', 'POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

async function searchPlayer(playerName) {
    try {
        const response = await axios.get(
            `https://eun1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${playerName}`,
            {
                headers: {
                    'X-Riot-Token': process.env.API_KEY,
                },
            }
        );
        const player = response.data;

        return player;
    } catch (error) {}
}

async function playerMastery(summonerId) {
    try {
        const response = await axios.get(
            `https://eun1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}`,
            {
                headers: {
                    'X-Riot-Token': process.env.API_KEY,
                },
            }
        );
        console.log(summonerId);
        const data = response.data;

        return data;
    } catch (error) {}
}

async function handleGET(req, res) {
    try {
        let data;
        switch (req.query.func) {
            case 'searchPlayer':
                data = await searchPlayer(req.query.user);
                res.status(200).json(data);

                break;
            case 'playerMastery':
                data = await playerMastery(req.query.id);
                res.status(200).json(data);

                break;
            default:
                console.error('bad query func');
                break;
        }
        return data;
    } catch (error) {
        return res.status(500).json(error);
    }
}

async function handlePOST(req, res) {
    try {
        const token = await getToken({ req });
        await prisma.user.update({
            where: {
                email: token.email,
            },
            data: {
                tags: {
                    set: req.body.tags,
                },
            },
        });
        res.status(200).send();
    } catch (error) {
        return res.status(500).json(error);
    }
}
