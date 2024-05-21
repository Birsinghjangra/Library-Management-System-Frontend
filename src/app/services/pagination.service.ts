import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PaginationService {

    constructor() { }

    paginateData(data: any[], pageNumber: number, pageSize: number): any[] {
        const startIndex = (pageNumber - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return data.slice(startIndex, endIndex);
    }

    calculateTotalPages(totalItems: number, pageSize: number): number {
        return Math.ceil(totalItems / pageSize);
    }

    updatePagination(currentPage: number, pageSize: number, totalItems: number): PaginationInfo {
        const totalPages = this.calculateTotalPages(totalItems, pageSize);
        const validPage = currentPage <= totalPages ? currentPage : totalPages;
        const startIndex = (validPage - 1) * pageSize;
        const endIndex = Math.min(startIndex + pageSize, totalItems);
        return {
            startIndex,
            endIndex,
            totalPages,
            currentPage: validPage
        };
    }
}

export interface PaginationInfo {
    startIndex: number;
    endIndex: number;
    totalPages: number;
    currentPage: number;
}
