import React from 'react';
import Pagination from '@material-ui/lab/Pagination';


function CustomPagination({setPage, numOfPages}) {
    
    const handlePageChange = (page) => {
        setPage(page);
        window.scroll(0,0);
    }

    return (
        <div 
            style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                marginTop: 10,
            }}
        >
            <Pagination 
                count={numOfPages} 
                onChange={(e) => handlePageChange(e.target.textContent)} 
                color="secondary"
                hideNextButton
                hidePrevButton
                style={{backgroundColor:'white', padding:10, borderRadius:500}}
            />
        </div>
    )
}

export default CustomPagination
