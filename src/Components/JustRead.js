import React from "react";
import "../styles/JustRead.css";
function JustRead({ selectedBooks }) {
  return (
    <div className="history">
      <h2 className="Truyen_vua_doc" style={{ color: "black" }}>
        Truyện vừa đọc
      </h2>
      {selectedBooks?.length > 0 ? (
        selectedBooks.map((book) => (
          <div className="content" key={book?._id}>
            <img
              className="img_history"
              src={book?.image}
              alt={book?.title}
              style={{ maxWidth: "500" }}
            />
            <div className="detail_history">
              <h4 className="title_history">{book?.title}</h4>
              {/* <h5 className="title_history">Chapter 1</h5> */}
            </div>
          </div>
        ))
      ) : (
        <p>Bạn chưa đọc truyện nào!</p>
      )}
    </div>
  );
}

export default JustRead;
