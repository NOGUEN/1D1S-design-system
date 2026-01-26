"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import { ChevronLeft } from "../Icons/ChevronLeft";
import { ChevronRight } from "../Icons/ChevronRight";
import { Text } from "../Text";

export interface PaginationProps {
  /** 현재 페이지 (1부터 시작) */
  currentPage: number;
  /** 총 페이지 수 */
  totalPages: number;
  /** 페이지 변경 핸들러 */
  onPageChange: (page: number) => void;
  /** 현재 페이지 양옆에 보여줄 페이지 개수 */
  siblingCount?: number;
  /** 추가 클래스 */
  className?: string;
}

const DOTS = "...";

function usePagination({
  currentPage,
  totalPages,
  siblingCount = 1,
}: {
  currentPage: number;
  totalPages: number;
  siblingCount: number;
}) {
  const paginationRange = React.useMemo(() => {
    // 총 보여질 페이지 번호의 개수 (siblingCount + firstPage + lastPage + currentPage + 2*DOTS)
    const totalPageNumbers = siblingCount + 5;

    // 전체 페이지 수가 보여질 개수보다 작으면 그냥 다 보여줌
    if (totalPageNumbers >= totalPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    // Case 2: 오른쪽에만 점이 있는 경우
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
      return [...leftRange, DOTS, totalPages];
    }

    // Case 3: 왼쪽에만 점이 있는 경우
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = Array.from(
        { length: rightItemCount },
        (_, i) => totalPages - rightItemCount + i + 1
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }

    // Case 4: 양쪽에 점이 있는 경우
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i
      );
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [totalPages, currentPage, siblingCount]);

  return paginationRange;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  className,
}: PaginationProps): React.ReactElement | null {
  const paginationRange = usePagination({
    currentPage,
    totalPages,
    siblingCount,
  });

  if (currentPage === 0 || totalPages < 2) {
    return null;
  }

  const onNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const onPrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      className={cn("flex items-center justify-center gap-1", className)}
    >
      <button
        onClick={onPrevious}
        disabled={currentPage === 1}
        className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
        aria-label="Go to previous page"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {paginationRange?.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <div
              key={`dots-${index}`}
              className="flex h-8 w-8 items-center justify-center"
            >
              <Text size="caption1" className="text-gray-400">
                ...
              </Text>
            </div>
          );
        }

        return (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber as number)}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors",
              pageNumber === currentPage
                ? "bg-main-900 text-white"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            )}
            aria-current={pageNumber === currentPage ? "page" : undefined}
          >
            <Text
              size="caption1"
              weight={pageNumber === currentPage ? "bold" : "medium"}
            >
              {pageNumber}
            </Text>
          </button>
        );
      })}

      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
        aria-label="Go to next page"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </nav>
  );
}
