import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'
import { convertHourStringToMinutos } from './utils/convert-hour-string-to-minutes'
import { convertMinutesToHourString } from './utils/conver-minutes-to-hour-string'

const app = express()
app.use(cors())
app.use(express.json())
const prisma = new PrismaClient({
    log: ['query']
})
app.get('/games', async (req, res) => {
    const games = await prisma.game.findMany({
        include: {
            _count: {
                select: {
                    ads: true
                },
            }
        }
    })
    return res.json(games)
})

app.get('/games/:id/ads', async (req, res) => {
    const gameId = req.params.id
    const ads = await prisma.ad.findMany({
        select: {
            id: true,
            name: true,
            weekDays: true,
            useVoiceChannel: true,
            yearsPlaying: true,
            hourStart: true,
            hourEnd: true
        },
        where: {
            gameId,
        }
    })
    return res.json(ads.map(ad => {
        return {
            ...ad,
            weekDays: ad.weekDays.split(','),
            hourStart: convertMinutesToHourString(ad.hourStart),
            hourEnd: convertMinutesToHourString(ad.hourEnd),
        }
    }))
})

app.get('/ads/:id/discord', async (req, res) => {
    const adId = req.params.id
    const ad = await prisma.ad.findUniqueOrThrow({
        select: {
            discord: true
        },
        where: {
            id: adId,
        }
    }).catch(err => {
        return res.json({ message: "Discord not found" })
    })
    return res.json(ad)
})

app.post('/games/:id/ads', async (req, res) => {
    const body = req.body
    const gameId = req.params.id
    const ad = await prisma.ad.create({
        data: {
            gameId,
            name: body.name,
            yearsPlaying: body.yearsPlaying,
            discord: body.discord,
            hourStart: convertHourStringToMinutos(body.hourStart),
            hourEnd: convertHourStringToMinutos(body.hourEnd),
            weekDays: body.weekDays.join(","),
            useVoiceChannel: body.useVoiceChannel
        }
    }).catch(err => {
        return res.json(err)
    })
    return res.json(ad)
})


app.listen(3333)
console.log('listening on http://localhost:3333')