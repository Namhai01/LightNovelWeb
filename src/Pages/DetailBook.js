import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/DetailBook.css";
import { Rate, message } from "antd";
import { postBody } from "../API/axiosClient";
function DetailBook() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [chapter, setChapter] = useState(1);
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem("selectedBook"));
    if (storedBooks) {
      const selectedBook = storedBooks.filter((book) => book._id === id);
      if (selectedBook) {
        setData(selectedBook);
      }
    }
  }, [id]);

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Truyện đã được theo dõi",
    });
  };
  const error = () => {
    messageApi.open({
      type: "error",
      content: "Đăng nhập để theo dõi truyện",
    });
  };

  const handelFollow = () => {
    postBody("/truyen/follow", { chapter: chapter, storyId: id }).then(
      (res) => {
        if (res.status === "Error") {
          error();
        } else {
          success();
        }
      }
    );
  };

  return (
    <div className="Detail_book">
      {contextHolder}
      {data.map((book) => (
        <div key={book._id} className="book-container">
          <div className="book-image">
            <img className="img" src={book.image} alt={book.title} />
          </div>
          <div className="book-info">
            <div className="Detail_book_name">{book.title}</div>
            <div className="Detail_book_author">
              Tác giả : <p className="right">{book.author}</p>
            </div>
            <div className="Detail_book_author">
              Thể loại : <p className="right">{book.category}</p>
            </div>
            <div className="Detail_book_author">
              Đánh giá : <Rate allowHalf disabled defaultValue={book.rate} />
            </div>
            <div className="Detail_book_author">
              Tóm tắt nội dung : <p>Light Novel</p>
            </div>
            <div className="button-container">
              <button className="follow-button" onClick={handelFollow}>
                Theo dõi
              </button>
              <div>
                <Link
                  to={`/Truyen/${book.title.replace(/\s+/g, "-")}/${
                    book._id
                  }/read?readType=fromBeginning`}
                >
                  <button className="read-button">Đọc từ đầu</button>
                </Link>
                <Link
                  to={`/Truyen/${book.title.replace(/\s+/g, "-")}/${
                    book._id
                  }/read?readType=continueReading`}
                >
                  <button className="read-button">Đọc tiếp</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DetailBook;
