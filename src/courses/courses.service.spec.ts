import { Test, TestingModule } from '@nestjs/testing';
import { CoursesService } from './courses.service';
import { Connection } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { Course } from './entities/course.entity';

describe('CoursesService', () => {
    let service: CoursesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CoursesService,
                { provide: Connection, useValue: {} },
                { provide: getRepositoryToken(Course), useValue: {} },
                { provide: getRepositoryToken(Tag), useValue: {} },

            ],
        }).compile();

        service = module.get<CoursesService>(CoursesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('findOne', () => {
        describe('Buscar curso pelo ID', () => {
            it('Deve retornar o obejto course', async () => {
                const courseId = ''
                const expectedCourse = {};

                const course = await service.findOne(id, courseId);
                expect(course).toEqual(expectedCourse);
            });

            it('Deve retornar um NOTFOUNDEXCEPTION', () => {

            });
        })
    })
});