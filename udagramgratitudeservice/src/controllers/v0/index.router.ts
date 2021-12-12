import {Router, Request, Response} from 'express';
import {GratitudeRouter} from './gratitude/routes/gratitude.router';

const router: Router = Router();

router.use('/gratitude', GratitudeRouter);

router.get('/', async (req: Request, res: Response) => {
  res.send(`V0`);
});

export const IndexRouter: Router = router;
