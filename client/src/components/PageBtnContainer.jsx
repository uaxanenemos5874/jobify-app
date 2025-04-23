import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useAllJobsCtxt } from "../pages/AllJobs";

function PageBtnContainer() {
  const {
    data: { numOfPages, currentPage },
  } = useAllJobsCtxt();

  // const pages = Array.from({ length: numOfPages }, (_, idx) => {
  //   return idx + 1;
  // });

  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  console.log(search, pathname);

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  };
  function addPageBtn({ pageNum, activeClass }) {
    return (
      <button
        className={`btn page-btn ${activeClass && "active"}`}
        key={pageNum}
        onClick={() => handlePageChange(pageNum)}>
        {pageNum}
      </button>
    );
  }

  //complex PAGINATION logic
  function renderPageBtns() {
    //⚠️ placement is important! ... JS is reading from top-bottom

    // first page
    const pageBtns = [];
    pageBtns.push(addPageBtn({ pageNum: 1, activeClass: currentPage === 1 }));

    // ... dots, before
    if (currentPage > 3) {
      pageBtns.push(
        <span className="page-btn dots" key="dots-1">
          ...
        </span>
      );
    }

    // 1 before curr. page
    if (currentPage !== 1 && currentPage !== 2) {
      pageBtns.push(
        addPageBtn({
          pageNum: currentPage - 1,
          activeClass: false,
        })
      );
    }

    // curr. page
    if (currentPage !== 1 && currentPage !== numOfPages) {
      pageBtns.push(
        addPageBtn({
          pageNum: currentPage,
          activeClass: true,
        })
      );
    }

    // 1 after curr. page
    if (currentPage !== numOfPages && currentPage !== numOfPages - 1) {
      pageBtns.push(
        addPageBtn({
          pageNum: currentPage + 1,
          activeClass: false,
        })
      );
    }

    // ... dots, after
    if (currentPage < numOfPages - 2) {
      pageBtns.push(
        <span className="page-btn dots" key="dots+1">
          ...
        </span>
      );
    }

    // last page
    pageBtns.push(
      addPageBtn({
        pageNum: numOfPages,
        activeClass: currentPage === numOfPages,
      })
    );
    return pageBtns;
  }

  return (
    <Wrapper>
      <button
        className="btn prev-btn"
        onClick={() => {
          let prevPage = currentPage - 1;
          if (prevPage < 1) prevPage = numOfPages;
          handlePageChange(prevPage);
        }}>
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className="btn-container">{renderPageBtns()}</div>
      <button
        className="btn next-btn"
        onClick={() => {
          let nextPage = currentPage + 1;
          if (nextPage > numOfPages) nextPage = numOfPages;
          handlePageChange(nextPage);
        }}>
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
}

export default PageBtnContainer;
