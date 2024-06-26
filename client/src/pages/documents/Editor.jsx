import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate, useParams } from "react-router-dom";
import { IoCaretBackCircle } from "react-icons/io5";
import { ImPriceTags } from "react-icons/im";
import { FaTrash } from "react-icons/fa";
import { MdPublish } from "react-icons/md";
import { FaShare } from "react-icons/fa";
import { IoCloudDownloadSharp } from "react-icons/io5";
import { toast } from "react-toastify";

import {
  createDocument,
  deleteDocument,
  getDocument,
  updateDocument,
  updateDocumentTags,
} from "src/features/documentsSlice";
import TagsEditor from "src/modules/Documents/DocumentTags/TagsEditor";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

const date = new Date();
const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};
const todayDate = date.toLocaleDateString("en-US", options);

const DocumentsEditor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openTags, setOpenTags] = useState(false);
  const { projectId } = useParams();

  const [values, setValues] = useState({
    title: "",
    content: "",
    tags: [],
    projectId,
  });
  const currentDocument = useSelector(
    (state) => state.documents.documents.currentData
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const documentId = searchParams.get("documentId");

  useEffect(() => {
    if (!documentId) return;
    dispatch(getDocument(documentId));
  }, [documentId]);

  useEffect(() => {
    setValues((prev) => ({
      ...prev,
      title: currentDocument?.title,
      content: currentDocument?.content,
      tags: currentDocument?.tags,
    }));
  }, [currentDocument]);

  const handlePublish = async () => {
    if (!documentId) {
      dispatch(createDocument(values, setSearchParams));
      return;
    }
    console.log("values", values);
    dispatch(updateDocument(documentId, values));
    toast.success("Document Updated Successfully!");
  };

  const handleTitleChange = (e) => {
    setValues({ ...values, title: e.target.value });
  };

  const handleContentChange = (content, delta, source, editor) => {
    setValues({ ...values, content });
  };

  const handleTags = (tagId) => {
    dispatch(updateDocumentTags(documentId, tagId));
    const tags = values.tags;
    if (tags.includes(tagId)) {
      const newTags = tags.filter((tag) => tag !== tagId);
      setValues({ ...values, tags: newTags });
      return;
    }
    setValues({ ...values, tags: [...tags, tagId] });
  };

  const handleDelete = () => {
    dispatch(deleteDocument(documentId));
    toast.info("Deleted Document Successfully!");
    navigate("../");
    dispatch(toggleModalVisibility(false));
  };

  const handleBack = () => {
    navigate("../");
  };

  return (
    <div className="w-full h-[100vh] overflow-y-auto">
      {/* {confirmModalView && (
        <ConfirmModal handleOk={handleDelete}>
          <h1 className="text-xl font-normal text-gray-200">
            Are you sure you want to delete this document?
          </h1>
        </ConfirmModal>
      )} */}

      <div className="max-w-4xl mx-auto bg-slate-100 py-4 sm:px-6 px-3 rounded-lg shadow-md mt-4 ">
        <div className="flex justify-between sm:items-center items-start gap-2 sm:flex-row flex-col py-3 border-b-[1px] border-blureffect mb-6">
          <button
            onClick={handleBack}
            className="w-max flex justify-start items-center gap-1 shadow-md text-textcolor bg-primary hover:text-gray-200 hover:bg-blue-700 transition-all duration-500 py-2 px-4 rounded-md"
          >
            <IoCaretBackCircle />
            <span className="text-sm font-semibold tracking-wide">Back</span>
          </button>
          <div className="flex justify-start items-center flex-wrap gap-2">
            <div className="relative">
              <button
                onClick={() => setOpenTags(!openTags)}
                className="w-max flex justify-start items-center gap-1 shadow-md text-textcolor bg-primary hover:text-gray-200 hover:bg-blue-700 transition-all duration-500 py-2 px-4 rounded-md"
              >
                <span className="text-sm font-semibold tracking-wide">
                  Add Tags
                </span>
                <ImPriceTags />
              </button>
              {openTags && (
                <TagsEditor
                  selectedTags={values.tags}
                  handleTags={(tagId) => handleTags(tagId)}
                />
              )}
            </div>
            <button className="w-max flex justify-start items-center gap-1 shadow-md text-textcolor bg-primary hover:text-gray-200 hover:bg-blue-700 transition-all duration-500 py-2 px-4 rounded-md">
              <span className="text-sm font-semibold tracking-wide">
                Share Doc
              </span>
              <FaShare />
            </button>
            <button className="w-max flex justify-start items-center gap-1 shadow-md text-textcolor bg-primary hover:text-gray-200 hover:bg-blue-700 transition-all duration-500 py-2 px-4 rounded-md">
              <span className="text-sm font-semibold tracking-wide">
                Download
              </span>
              <IoCloudDownloadSharp />
            </button>
            <button
              // onClick={() => dispatch(setConfirmModal(true))}
              className="w-max flex justify-start items-center gap-1 shadow-md text-textcolor bg-primary hover:text-gray-200 hover:bg-blue-700 transition-all duration-500 py-2 px-4 rounded-lg"
            >
              <span className="text-sm font-semibold tracking-wide">
                Delete
              </span>
              <FaTrash />
            </button>

            <button
              onClick={handlePublish}
              className="w-max flex justify-start items-center gap-1 shadow-md text-textcolor bg-primary hover:text-gray-200 hover:bg-blue-700 transition-all duration-500 py-2 px-4 rounded-lg"
            >
              <span className="text-sm font-semibold tracking-wide">
                Publish
              </span>
              <MdPublish />
            </button>
          </div>
        </div>

        <input
          value={values?.title}
          onChange={handleTitleChange}
          className="bg-primary w-full outline-none mb-4 py-4 px-3 text-slate-700 placeholder:text-blureffect placeholder:font-extrabold font-semibold rounded-lg md:text-4xl text-3xl"
          type="text"
          placeholder="New Post Title Here..."
        />

        <ReactQuill
          value={values?.content}
          onChange={handleContentChange}
          modules={modules}
          formats={formats}
          placeholder="Start typing here..."
        />
      </div>
    </div>
  );
};

export default DocumentsEditor;
