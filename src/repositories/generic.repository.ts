import { FilterQuery, Model, UpdateQuery, PipelineStage } from 'mongoose';
import { cloneDeep } from 'lodash';

import { newMgModel, updateMgModel } from '../utils';

import { MgModificationInterface } from '../models/mongo';
import { LogRepos } from './log.repository';

export class GenericRepository<T extends MgModificationInterface> {
    private model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
    }

    async find(query: FilterQuery<T>, sort?: any): Promise<T[] | null> {
        query = { isDeleted: false, ...query };
        return this.model.find(query).sort(sort).exec();
    }

    async findOne(query: FilterQuery<T>): Promise<T | null> {
        query = { isDeleted: false, ...query };
        return this.model.findOne(query).exec();
    }

    async count(query: FilterQuery<T> = {}): Promise<number> {
        const updatedQuery = { ...query, isDeleted: false };
        return this.model.countDocuments(updatedQuery).exec();
    }

    async create(data: T, token: any): Promise<T> {
        const _data: any = cloneDeep(data || {});
        Object.assign(_data, newMgModel({}, token));
        return this.model.create(_data);
    }

    async insertMany(data: T[]): Promise<T[] | null> {
        try {
            const insertedDocuments = await this.model.insertMany(data);
            return insertedDocuments;
        } catch (error) {
            console.error('Error inserting documents:', error);
            throw new Error('Failed to insert documents');
        }
    }

    async update(id: string, data: T, token: any): Promise<T | null> {
        const query = { _id: id, isDeleted: false };
        const existingDocument = await this.model.findOne(query as any).exec();
        if (!existingDocument) return null;
        Object.assign(existingDocument, data);
        Object.assign(existingDocument, updateMgModel(existingDocument, token));
        const updatedDocument = await existingDocument.save();
        return updatedDocument.toObject() as T;
    }

    async newCreate(data: T, token: any, action: string, type: string): Promise<T> {
        const result = await this.mgNewCreate(data, token);
        const isOK = !!result;
        isOK && LogRepos.log(result, action, type);
        return result;
    }

    async mgNewCreateDefault(data: T): Promise<T> {
        const _data: any = cloneDeep(data || {});
        return await this.model.create(_data);
    }

    async mgNewCreate(data: T, token: any): Promise<T> {
        const _data: any = cloneDeep(data || {});
        Object.assign(_data, newMgModel({}, token));
        return await this.model.create(_data);
    }

    async upsert(data: T, token: any, action: string, type: string): Promise<T | null> {
        const result = await this.mgUpsert(data, token);
        const isOK = !!result;
        isOK && LogRepos.log(data, action, type);
        return result;
    }

    async mgUpsert(data: T, token: any): Promise<T | null> {
        const query = { _id: data._id, isDeleted: false };
        const updateDatas = updateMgModel(data, token);
        const result = await this.model.findOneAndUpdate(query as any, updateDatas, { new: true });
        return result;
    }

    async mgFindOneAndUpdate(query: any, data: any, token: any): Promise<any> {
        const updateDatas = updateMgModel(data, token);
        const result = await this.model.findOneAndUpdate(query as any, updateDatas, { new: true });
        return result;
    }

    async mgFindOneAndUpdateDefault(query: any, data: any): Promise<any> {
        const result = await this.model.findOneAndUpdate(query as any, data, { new: true });
        return result;
    }

    async deleteById(id: string, authedUser: any, action: string, type: string): Promise<boolean> {
        const query = { _id: id, isDeleted: false };
        const updateDatas = updateMgModel({ isDeleted: true }, authedUser);
        const result = await this.model.findOneAndUpdate(query as any, updateDatas, { new: true });
        const isOK = !!result;
        Object.assign(updateDatas, { _id: id });
        isOK && LogRepos.log(updateDatas, action, type);
        return isOK;
    }

    async mgFindById(id: string, includes: string[]): Promise<T | null> {
        const query = { _id: id, isDeleted: false };
        return this.model
            .findOne(query as any)
            .select(includes.join(' '))
            .exec();
    }

    async mgFindOne(query: FilterQuery<T>, includes: string[]): Promise<T | null> {
        return this.model.findOne(query).select(includes.join(' ')).exec();
    }

    async findById(id: string): Promise<T | null> {
        const query = { _id: id, isDeleted: false };
        return this.model.findOne(query as any).exec();
    }

    async delete(id: string, token: any): Promise<boolean> {
        const query = { _id: id, isDeleted: false };
        const updateDatas = updateMgModel({ isDeleted: true }, token);
        const result = await this.model.findOneAndUpdate(query as any, updateDatas, { new: true }).exec();
        return !!result;
    }

    async search(query: FilterQuery<T>, sort: Record<string, any> | null, page: number, size: number): Promise<T[]> {
        const _query = { ...query, isDeleted: false };
        let _sort: any = { ...sort };
        if (!sort) {
            _sort = { createdDate: -1 };
        }
        return this.model
            .find(_query)
            .sort(_sort)
            .skip((page - 1) * size)
            .limit(size)
            .exec();
    }

    async searchAllSorted(query: FilterQuery<T>, sort: Record<string, any> | null = { createdDate: -1 }): Promise<T[]> {
        const _query = { ...query, isDeleted: false };
        const _sort: any = { ...sort };
        return this.model.find(_query).sort(_sort).exec();
    }

    async aggregate(aggregate: PipelineStage[]): Promise<any[]> {
        return this.model.aggregate(aggregate).exec();
    }

    async getAll(sort?: any): Promise<T[]> {
        const query = { isDeleted: false };
        let _sort: any = { ...sort };
        if (!sort) {
            _sort = { createdDate: -1 };
        }
        return this.model
            .find(query as any)
            .sort(_sort)
            .exec();
    }

    async searchBasic(query: FilterQuery<T>, includes: string[]): Promise<T[]> {
        return await this.model.find(query).select(includes.join(' ')).exec();
    }

    async searchPage(
        query: FilterQuery<T>,
        includes: string[],
        sort: Record<string, any> | null,
        page: number,
        size: number,
    ): Promise<T[]> {
        return await this.model
            .find(query)
            .sort(sort)
            .select(includes.join(' '))
            .skip((page - 1) * size)
            .limit(size)
            .exec();
    }

    async searchAll(query: FilterQuery<T>): Promise<T[]> {
        const _query = { ...query, isDeleted: false };
        return await this.model.find(_query).sort({ createdDate: -1 }).exec();
    }

    async updateMany(condition: FilterQuery<T>, updateFields: UpdateQuery<T>): Promise<boolean> {
        const updatedQuery = { ...condition, isDeleted: false };
        const result = await this.model.updateMany(updatedQuery, { $set: updateFields }).exec();
        const { modifiedCount } = result || {};
        if (modifiedCount > 0) return true;
        else return false;
    }

    async updateManyV2(condition: FilterQuery<T>, updateFields: UpdateQuery<T>): Promise<any> {
        const updatedQuery = { ...condition, isDeleted: false };
        const result = await this.model.updateMany(updatedQuery, { $set: updateFields }).exec();
        return result;
    }

    async push(condition: FilterQuery<T>, pushFields: UpdateQuery<T>): Promise<any> {
        const updatedQuery = { ...condition, isDeleted: false };
        const result = await this.model.updateMany(updatedQuery, { $push: pushFields }).exec();
        return result;
    }

    async deleteManyByIds(ids: string[]): Promise<any> {
        const condition = { _id: { $in: ids }, isDeleted: false };
        const update: Record<string, any> = { isDeleted: true };
        const result = await this.model.updateMany(condition as any, { $set: update }).exec();
        const { modifiedCount } = result;
        return modifiedCount || 0;
    }

    async deleteMany(query: FilterQuery<any>, token: any): Promise<boolean> {
        const _query = { ...query, isDeleted: false };
        const updateOpts = updateMgModel({ isDeleted: true }, token);
        const result = await this.model.updateMany(_query as any, { $set: updateOpts }).exec();
        const { modifiedCount } = result;
        if (modifiedCount > 0) return true;
        else return false;
    }

    async deleteManyByCondition(condition: FilterQuery<T>): Promise<boolean> {
        const updatedCondition = { ...condition, isDeleted: false };
        const updateOpts = updateMgModel({ isDeleted: true });
        const result = await this.model.updateMany(updatedCondition, { $set: updateOpts }).exec();
        return !!result;
    }
}
