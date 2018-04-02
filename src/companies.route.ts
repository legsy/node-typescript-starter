import {Request, Response} from 'express';
import * as db from './dataprovider';
import {COURSES} from "./db-data";

export async function getCompanyList(req: Request, res: Response) {
    try {
        let cmp = await db.getCompanyList('0da2ed73-b073-46e6-9a66-9450a1fc4989');
        res.status(200).json({
            payload:cmp
        });
      } catch (err) {
        console.log('oops, an error occurred', err);
      }
}

export async function getCompanyById(req: Request, res: Response) {
    const courseId = req.params["id"];
    const courses = COURSES;
    const course = courses.find(course => course.id == courseId);
    res.status(200).json(course);
}