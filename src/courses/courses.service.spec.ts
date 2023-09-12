import { Test, TestingModule } from '@nestjs/testing';
import { CoursesService } from './courses.service';
import { Connection, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { Course } from './entities/course.entity';
import { NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto/update-course.dto';

describe('CoursesService', () => {
    let service: CoursesService;
    let id;
    let date;


    beforeEach(async () => {
        service = new CoursesService();
        id = 'befba760-f00a-4964-9563-4aebb6f8a67e';
        date = new Date();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should creates a course', async () => {
        const expectOutputTags = [
            {
                id,
                name: 'nestjs',
                created_at: date
            }
        ];

        const expectOutputCourse = {
            id,
            name: 'test',
            description: 'test',
            created_at: date,
            tags: expectOutputTags
        };

        const mockCourseRepository = {
            create: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
            save: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse))
        };

        const mockTagRepository = {
            create: jest.fn().mockReturnValue(Promise.resolve(expectOutputTags)),
            findOne: jest.fn()
        };

        //@ts-expect-error defined part of methods
        service['courseRepository'] = mockCourseRepository
        //@ts-expect-error defined part of methods
        service['tagRepository'] = mockTagRepository

        const createCourseDto: CreateCourseDto = {
            name: 'test',
            description: 'test',
            tags: ['nestjs'],
        };
        
        const newCourse = await service.create(createCourseDto);

        expect(mockCourseRepository.save).toHaveBeenCalled();
        expect(expectOutputCourse).toStrictEqual(newCourse);
    });

    it('should list courses', async () => {
        const expectOutputTags = [
            {
                id,
                name: 'nestjs',
                created_at: date
            }
        ];

        const expectOutputCourse = [{
            id,
            name: 'test',
            description: 'test',
            created_at: date,
            tags: expectOutputTags
        }];

        const mockCourseRepository = {
            findAll: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
            find: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse))
        };

        //@ts-expect-error defined part of methods
        service['courseRepository'] = mockCourseRepository
        const courses = await service.findAll();

        expect(mockCourseRepository.find).toHaveBeenCalled();
        expect(expectOutputCourse).toStrictEqual(courses);
    });

    it('should gets a courses', async () => {
        const expectOutputTags = [
            {
                id,
                name: 'nestjs',
                created_at: date
            }
        ];

        const expectOutputCourse = [{
            id,
            name: 'test',
            description: 'test',
            created_at: date,
            tags: expectOutputTags
        }];

        const mockCourseRepository = {
            findOne: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse))
        };

        //@ts-expect-error defined part of methods
        service['courseRepository'] = mockCourseRepository
        const course = await service.findOne(id);

        expect(mockCourseRepository.findOne).toHaveBeenCalled();
        expect(expectOutputCourse).toStrictEqual(course);
    });

    it('should updates a course', async () => {
        const expectOutputTags = [
            {
                id,
                name: 'nestjs',
                created_at: date
            }
        ];

        const expectOutputCourse = {
            id,
            name: 'test',
            description: 'test',
            created_at: date,
            tags: expectOutputTags
        };

        const mockCourseRepository = {
            update: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
            save: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
            preload: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
        };

        const mockTagRepository = {
            create: jest.fn().mockReturnValue(Promise.resolve(expectOutputTags)),
            findOne: jest.fn()
        };

        //@ts-expect-error defined part of methods
        service['courseRepository'] = mockCourseRepository
        //@ts-expect-error defined part of methods
        service['tagRepository'] = mockTagRepository

        const updateCourseDto: UpdateCourseDto = {
            name: 'test',
            description: 'test',
            tags: ['nestjs'],
        };
        
        const course = await service.update(id, updateCourseDto);

        expect(mockCourseRepository.save).toHaveBeenCalled();
        expect(expectOutputCourse).toStrictEqual(course);
    });

    it('should remove a course', async () => {
        const expectOutputTags = [
            {
                id,
                name: 'nestjs',
                created_at: date
            }
        ];

        const expectOutputCourse = [{
            id,
            name: 'test',
            description: 'test',
            created_at: date,
            tags: expectOutputTags
        }];

        const mockCourseRepository = {
            findOne: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
            remove: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse))
        };

        //@ts-expect-error defined part of methods
        service['courseRepository'] = mockCourseRepository
        const course = await service.remove(id);

        expect(mockCourseRepository.remove).toHaveBeenCalled();
        expect(expectOutputCourse).toStrictEqual(course);
    });

    // describe('findOne', () => {
    //     describe('Buscar curso pelo ID', () => {
    //         it('Deve retornar o obejto course', async () => {
    //             const courseId = '1'
    //             const expectedCourse = {};

    //             courseRepository.findOne.mockReturnValue(expectedCourse)
    //             const course = await service.findOne(courseId);
    //             expect(course).toEqual(expectedCourse);
    //         });

    //         it('Deve retornar um NotFoundException', async () => {
    //             const courseId = '1'
    //             courseRepository.findOne.mockReturnValue(undefined)
    //             try {
    //                 await service.findOne(courseId);
    //             } catch (error) {
    //                 expect(error).toBeInstanceOf(NotFoundException);
    //                 expect(error.message).toEqual(`Course ID ${courseId} not found`)
    //             }
    //         });
    //     })
    // })
});