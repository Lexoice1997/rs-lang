import { ChangeEventHandler, useState } from "react";
import styles from "./paginator.module.scss"

type PropsType = {
    portionSize: number 
    totalItemsCount:number
    pageSize: number
    page: number
    onPageChanged: ()=>void
    onPageChangedCount: (c:number)=>void
}

const Paginator = ({portionSize = 5, totalItemsCount, pageSize, page, onPageChanged, onPageChangedCount, ...props}:PropsType) => {

    const pagesCount = Math.ceil(totalItemsCount / pageSize);
    const pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    const portionCount = Math.ceil(pagesCount / portionSize);
    const [portionNumber, setPortionNumber] = useState(1);
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    const rightPortionPageNumber = portionNumber * portionSize;

    const countPacks = [10, 20, 30, 50];

    const option = countPacks.map((c, i) => {
        return <option key={i} value={c}>{c}</option>
    });

    const onChangeCountPacks = (e:any) => {
        onPageChangedCount(e.currentTarget.value)
    };


    return (
        <div>
            <div>
                <span>choose the number of packs on page: </span>
                <select onChange={onChangeCountPacks} value={pageSize}>
                    {option}
                </select>
            </div>
            <div className={styles.paginator}>

                {portionNumber > 1 &&
                <button onClick={() => {
                    setPortionNumber(portionNumber - 1)
                }}>«</button>
                }
                {pages
                    .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                    .map((p) => {
                        return <span className={styles.pageNumber}> <span
                            className={page === p ? styles.selectedPage : ''}
                            key={p}
                            onClick={(e) => {
                                onPageChanged()
                            }}>{p}</span></span>
                    })}
                {portionCount > portionNumber &&
                <button onClick={() => {
                    setPortionNumber(portionNumber + 1)
                }}>»</button>
                }
            </div>
        </div>)

};
export default Paginator