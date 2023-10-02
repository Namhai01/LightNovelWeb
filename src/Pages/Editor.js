import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "../styles/Abc.css";
import { Button } from "antd";
import { postBody } from "../API/axiosClient";
function Editor() {
  const [data, setData] = useState(null);

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setData(data);
  };

  const saveTruyen = () => {
    postBody("/truyen/chapter/add", {
      id: "64f43cea8ba38c933d657f6a",
      name: "Chapter 2",
      content: data,
      chapter: 2,
    }).then((res) => console.log(res));
  };
  return (
    <div className="Editor">
      <h2>Update Truyện</h2>
      <div className="ckEditor">
        <CKEditor
          editor={ClassicEditor}
          data="<p>Hello from CKEditor&nbsp;5!</p>"
          onChange={handleEditorChange}
        />
        <div className="bnt_form">
          <Button className="btn">Reset</Button>
          <Button className="btn" onClick={saveTruyen}>
            Update
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Editor;
