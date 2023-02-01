import dbConnect from "../../util/mongo"
import cookie, { serialize } from 'cookie'

const handler = (req, res) => {

    const { method } = req
    if (method === 'POST') {
        const { username, password } = req.body

        if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {

            res.setHeader('Set-Cookie', cookie.serialize('token', process.env.TOKEN, {
                maxAge: 60 * 60,
                sameSite: 'strict',
                path: '/',
                // httpOnly: true,
                // secure: process.env.NODE_ENV !== 'development'
                // WHAT IT MEANS IS THE IF WE ARE IN THE DEVELOPMENT IT SHOULD NOT ADD SECURE BECAUSE IF WE ADD SECURE IT WILL NOT WORKS BECAUSE IT IS HTTP AND SECURE NEED HTTPS
                // NOTE I NEED TO SET httpOnly: true BUT BECAUSE AM NOT COLLECTING THE USERNAME AND PASSWORD FROM THE DATABASE SO IT DOES NOT NEED OR IF I ADDED IT WILL NOT WORKS
            })
            );
            res.status(200).json('successful')
        } else {
            res.status(400).json('wrong credentials')
        }
    }
}

export default handler