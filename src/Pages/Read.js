import React, { useEffect, useState } from "react";
import { Button, Select, Spin } from "antd";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import parse from "html-react-parser";
import "../styles/Read.css";
import { postBody } from "../API/axiosClient";
function Read() {
  const { id, chapter } = useParams();
  const [currentChapter, setCurrentChapter] = useState(chapter);
  const [totalChapters, setTotalChapters] = useState(1);
  const [BookContent, setBookContent] = useState("");
  const [BookName, setBookName] = useState("");
  const [loading, setLoading] = useState(true);

  const updateCurrentChapter = (newChapter) => {
    postBody("/truyen/chapter/updatelast", {
      id: id,
      chapter: newChapter,
    })
      .then((response) => {
        // Xử lý khi cập nhật thành công
        console.log("Cập nhật currentChapter thành công!");
        // setCurrentChapter(newChapter);
      })
      .catch((error) => {
        // Xử lý khi có lỗi xảy ra
        console.error("Lỗi khi cập nhật currentChapter:", error);
      });
  };

  const handleChangeChapter = (value) => {
    setCurrentChapter(value);
    updateCurrentChapter(value);
  };

  const handlePrevChapter = () => {
    const prevChapter = parseInt(currentChapter, 10) - 1;
    if (prevChapter >= 1) {
      handleChangeChapter(prevChapter.toString());
    }
  };

  const handleNextChapter = () => {
    const nextChapter = parseInt(currentChapter, 10) + 1;
    if (nextChapter <= totalChapters) {
      handleChangeChapter(nextChapter.toString());
    }
  };

  useEffect(() => {
    postBody("/truyen/chapter", { id: id, chapter: currentChapter }).then(
      (res) => {
        setBookName(res.chapter.name);
        setTotalChapters(res.count);
        setBookContent(res.chapter.content);
        setLoading(false);
      }
    );
  }, [chapter, currentChapter, id]);

  return (
    <div className="Read">
      <div className="chapter">
        <Button className="prev a_prev" onClick={handlePrevChapter}>
          <FontAwesomeIcon
            icon={faAngleRight}
            rotation={180}
            style={{ color: "#030303" }}
          />
        </Button>
        <Select
          className="select-chapter"
          value={`Chapter ${currentChapter}`}
          onChange={handleChangeChapter}
        >
          {Array.from({ length: totalChapters }, (_, index) => (
            <Select.Option key={index + 1} value={(index + 1).toString()}>
              Chapter {index + 1}
            </Select.Option>
          ))}
        </Select>

        <Button className="next a_next" onClick={handleNextChapter}>
          <FontAwesomeIcon icon={faAngleRight} style={{ color: "#030303" }} />
        </Button>
      </div>
      <div className="read_title">{BookName}</div>
      {loading ? (
        <Spin size="large" />
      ) : (
        /* Hiển thị nội dung khi dữ liệu đã sẵn sàng */
        <div>
          <div className="content">
            <span>{parse(BookContent)}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Read;
