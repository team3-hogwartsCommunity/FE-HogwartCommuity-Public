// count, page, onPageChange
// 전체 페이지, 현재 페이지, 페이지 변경 핸들러


const usePagination = ({count, page, onPageChange, disabled, siblingCount = 1, boundaryCount = 1}) => {

    // 시작과 끝을 지정했을때, 그 사이에 해당하는 값들을 배열을 반환할 함수
    const range = (start, end) => {
        const length = end - start + 1;
        return Array.from({length}).map(((_, index) => index + start))
    }
    const startPage = 1;
    const endPage = count;

    // 1, 2 .... 6, 7, 8... 99, 100
    // 시작은 startPage, 끝은 boundaryCount와 count 중 작은 값
    const startPages = range(startPage, Math.min(boundaryCount, count))
    const endPages = range(Math.max(count - boundaryCount + 1, boundaryCount + 1), count)



    // siblingCount = 현재 페이지 전후에 항상 표시될 숫자
    const siblingStart = Math.max(
        Math.min(
            page+1 - siblingCount,
            count - boundaryCount - siblingCount * 2 - 1 
        ),
        boundaryCount + 2
    );
    const siblingEnd = Math.min(
        Math.max(
            page + 1 + siblingCount,
            boundaryCount + siblingCount * 2 + 2
        ),
        endPages.length > 0 ? endPages[0] - 2 : endPage - 1
    )

    const itemList = [
        'prev',
        ...startPages,
        ...(siblingStart > boundaryCount + 2 ? ['start-ellipsis'] : boundaryCount + 1 < count - boundaryCount ? [boundaryCount + 1] : []),
        ...range(siblingStart, siblingEnd),
        ...(siblingEnd < count - boundaryCount - 1 ? ['end-ellipsis'] : count - boundaryCount > boundaryCount ? [count-boundaryCount] : []),
        ...endPages,
        'next'
    ]

    const items = itemList.map((item, index) => (
        typeof item === 'number' ? {
            key : index,
            onClick : () => onPageChange(item - 1),
            disabled,
            selected : item - 1 === page,
            item
        }:{
            key:index,
            onClick : () => onPageChange(item === 'next' ? page + 1 : page - 1),
            disabled : disabled || item.indexOf('ellipsis') > -1 || (item === 'next' ? page >= count - 1 : page < 1),
            selected : false, 
            item
        }
    ))
    return {items}
}

export default usePagination;