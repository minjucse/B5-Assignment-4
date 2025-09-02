export interface Book {
_id: string
title: string
author: string
genre?: string
isbn?: string
description?: string
copies: number
available: boolean
}


export interface BorrowRecord {
_id: string
bookId: string
userName: string
quantity: number
dueDate: string // ISO date
date: string // borrowed at
}


export interface BorrowSummaryItem {
bookId: string
title: string
isbn?: string
totalQuantity: number
}