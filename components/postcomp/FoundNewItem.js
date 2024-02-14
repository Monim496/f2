import React, { Fragment } from "react";
import { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loadings from "../notificationOverlay/Loadings";

function FoundNewItem() {
  const [isLoading, setIsLoading] = useState(false);
  const [isImage, setIsImage] = useState("");
  const [fileError, setFileError] = useState("");

  const typeInputRef = useRef();
  const categoryInputRef = useRef();
  const titleInputRef = useRef();
  const descriptionInputRef = useRef();
  const questionInputRef = useRef();
  const dateInputRef = useRef();

  async function sendEmails(subject, message) {
    const response = await fetch("/api/email/sendEmail", {
      method: "POST",
      body: JSON.stringify({
        subject,
        message,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      toast.error("Error in sending email to registered users.", {
        theme: "colored",
      });
    }
    if (data.success) {
      toast.success(data.message, { theme: "colored" });
    }

    return data;
  }

  async function sendPostData(
    Type,
    Category,
    Title,
    Description,
    Question,
    Date,
    imageInbase64
  ) {
    const response = await fetch("/api/post/postitem", {
      method: "POST",
      body: JSON.stringify({
        Type,
        Category,
        Title,
        Description,
        Question,
        Date,
        ReducedImg: imageInbase64,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (!response.ok) {
      setIsLoading(false);

      toast.error(data.message, { theme: "colored" });
    } else {
      toast.success(data.message, { theme: "colored" });
    }

    return data;
  }
  function converttobase64(e) {
    const selectedFile = e.target.files[0];

    // Check if a file is selected
    if (selectedFile) {
      // Check the file type
      if (
        selectedFile.type === "image/png" ||
        selectedFile.type === "image/jpeg" ||
        selectedFile.type === "image/jpg"
      ) {
        setFileError(""); // Reset file error
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);

        reader.onload = () => {
          setIsImage(reader.result);
        };

        reader.onerror = () => {
          console.log("Error reading the file");
        };
      } else {
        // File type not allowed
        setFileError(
          "Invalid file type. Please select a PNG or JPEG/JPG file."
        );
      }
    }
  }
  const postSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const enteredType = typeInputRef.current.value;
    const enteredCategory = categoryInputRef.current.value;
    const enteredTitle = titleInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const enteredQuestion = questionInputRef.current.value;
    const enteredDate = dateInputRef.current.value;

    const humanReadableDate = new Date(enteredDate).toLocaleDateString(
      "en-US",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );

    const message = `
<html lang="en">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Simple Transactional Email</title>
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Oxanium:wght@200;300;400;500;600;700;800&display=swap"
    />

    <style media="all" type="text/css">
      table,
      td {
        border-collapse: collapse;
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
      }
      @media all {
        .btn-primary table td:hover {
          background-color: #0867ec !important;
        }

        .btn-primary a:hover {
          background-color: #0867ec !important;
          border-color: #0867ec !important;
        }
      }
      @media only screen and (max-width: 640px) {
        .main p,
        .main td,
        .main span {
          font-size: 16px !important;
        }

        .wrapper {
          padding: 8px !important;
        }

        .content {
          padding: 0 !important;
        }

        .container {
          padding: 0 !important;
          padding-top: 8px !important;
          width: 100% !important;
        }

        .main {
          border-left-width: 0 !important;
          border-radius: 0 !important;
          border-right-width: 0 !important;
        }

        .btn table {
          max-width: 100% !important;
          width: 100% !important;
        }

        .btn a {
          font-size: 16px !important;
          max-width: 100% !important;
          width: 100% !important;
        }
      }
      @media all {
        .ExternalClass {
          width: 100%;
        }

        .ExternalClass,
        .ExternalClass p,
        .ExternalClass span,
        .ExternalClass font,
        .ExternalClass td,
        .ExternalClass div {
          line-height: 100%;
        }

        .apple-link a {
          color: inherit !important;
          font-family: inherit !important;
          font-size: inherit !important;
          font-weight: inherit !important;
          line-height: inherit !important;
          text-decoration: none !important;
        }

        #MessageViewBody a {
          color: inherit;
          text-decoration: none;
          font-size: inherit;
          font-family: inherit;
          font-weight: inherit;
          line-height: inherit;
        }
      }
    </style>
  </head>
  <body style="
  font-family: Oxanium, sans-serif;
  -webkit-font-smoothing: antialiased;
  font-size: 16px;
  line-height: 1.3;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  background-color: #f4f5f6;
  margin: 0;
  padding: 0;
">
    <pre><table
    role="presentation"
    border="0"
    cellpadding="0"
    cellspacing="0"
    class="body"
    style="
      border-collapse: separate;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
      background-color: #f4f5f6;
      width: 100%;
    "
    width="100%"
    bgcolor="#f4f5f6"
  >
    <tr>
      <td
        style="
          font-family: Oxanium, sans-serif;
          font-size: 16px;
          vertical-align: top;
        "
        valign="top"
      >
        &nbsp;
      </td>
      <td
        class="container"
        style="
          font-family: Oxanium, sans-serif;
          font-size: 16px;
          vertical-align: top;
          max-width: 600px;
          padding: 0;
          padding-top: 24px;
          width: 600px;
          margin: 0 auto;
        "
        width="600"
        valign="top"
      >
        <div
          class="content"
          style="
            box-sizing: border-box;
            display: block;
            margin: 0 auto;
            max-width: 600px;
            padding: 0;
          "
        >
          <!-- START CENTERED WHITE CONTAINER -->
          <span
            class="preheader"
            style="
              color: transparent;
              display: none;
              height: 0;
              max-height: 0;
              max-width: 0;
              opacity: 0;
              overflow: hidden;
              mso-hide: all;
              visibility: hidden;
              width: 0;
            "
            >LostNest: Lost and Found Hub For University Students, UET Taxila</span
          >
          <table
            role="presentation"
            border="0"
            cellpadding="0"
            cellspacing="0"
            class="main"
            style="
              border-collapse: separate;
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
              background: #ffffff;
              border: 1px solid #eaebed;
              border-radius: 16px;
              width: 100%;
            "
            width="100%"
          >
            <!-- START MAIN CONTENT AREA -->
            <tr>
              <td
                style="
                  padding: 48px 0 30px 0;
                  text-align: center;
                  font-size: 2.5rem;
                  color: #311465;
                "
              >
                LOSTNEST UETTAXILA
              </td>
            </tr>
            <tr>
              <td
                class="wrapper"
                style="
                  font-family: Oxanium, sans-serif;
                  font-size: 16px;
                  vertical-align: top;
                  box-sizing: border-box;
                  padding: 24px;
                "
                valign="top"
              >
                <p
                  style="
                    font-family: Oxanium, sans-serif;
                    font-size: 16px;
                    font-weight: normal;
                    margin: 0;
                    margin-bottom: 16px;
                  "
                >
                  Hi there
                </p>
                <p
                  style="
                    font-family: Oxanium, sans-serif;
                    font-size: 16px;
                    font-weight: normal;
                    margin: 0;
                    margin-bottom: 16px;
                    text-align: justify;
                  "
                >
                  The 🔍<b>${enteredType.toLowerCase()} </b> item, named
                  <b>'${enteredTitle}'</b>, belonging to the category
                  <b>'${enteredCategory}'</b>, was
                  <b>${enteredType.toLowerCase()}</b> on 📅
                  <b>${humanReadableDate}</b>.<br /><br />
                  📝 Description: ${enteredDescription}.
                </p>
                <p
                  style="
                    padding: 0 0 16px 0;
                    font-size: 14px;
                    line-height: 150%;
                    font-weight: 400;
                    color: #000000;
                    letter-spacing: 0.01em;
                  "
                >
                  If you have any information about the ${enteredType} item,
                  kindly visit the LostNest web application.
                </p>
                <table
                  role="presentation"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  class="btn btn-primary"
                  style="
                    border-collapse: separate;
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    box-sizing: border-box;
                    width: 100%;
                    min-width: 100%;
                  "
                  width="100%"
                >
                  <tbody>
                    <tr>
                      <td
                        align="left"
                        style="
                          font-family: Oxanium, sans-serif;
                          font-size: 16px;
                          vertical-align: top;
                          padding-bottom: 16px;
                        "
                        valign="top"
                      >
                        <table
                          role="presentation"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          style="
                            border-collapse: separate;
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            width: auto;
                          "
                        >
                          <tbody>
                            <tr>
                              <td
                                style="
                                  font-family: Oxanium, sans-serif;
                                  font-size: 16px;
                                  vertical-align: top;
                                  border-radius: 4px;
                                  text-align: center;
                                  background-color: #0867ec;
                                "
                                valign="top"
                                align="center"
                                bgcolor="#0867ec"
                              >
                                <a
                                  href="https://www.lostnest.xyz/"
                                  target="_blank"
                                  style="
                                    border: solid 2px #0867ec;
                                    border-radius: 4px;
                                    box-sizing: border-box;
                                    cursor: pointer;
                                    display: inline-block;
                                    font-size: 16px;
                                    font-weight: bold;
                                    margin: 0;
                                    padding: 12px 24px;
                                    text-decoration: none;
                                    text-transform: capitalize;
                                    background-color: #311465;
                                    border-color: #0867ec;
                                    color: #ffffff;
                                  "
                                  >Visit LostNest</a
                                >
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>

                    <tr>
                      <td style="padding: 16px 0 16px">
                        <span
                          style="
                            display: block;
                            width: 117px;
                            border-bottom: 1px solid #8b949f;
                          "
                        ></span>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style="
                          font-size: 14px;
                          line-height: 170%;
                          font-weight: 400;
                          color: #000000;
                          letter-spacing: 0.01em;
                        "
                      >
                        Best regards, <br /><strong
                          >LostNest UETTaxila</strong
                        >
                      </td>
                    </tr>
                  </tbody>
                </table>

                <p
                  style="
                    font-family: Oxanium, sans-serif;
                    font-size: 12px;
                    font-weight: normal;
                    margin: 0;
                    margin-top: 16px;
                    margin-bottom: 16px;
                    text-align: justify;
                  "
                >
                Thank you for being a valued member of our Lost Nest community. Your commitment to kindness and sincerity helps make our platform a safe and supportive space for all.
                </p>
              </td>
            </tr>

            <!-- END MAIN CONTENT AREA -->
          </table>

          <!-- START FOOTER -->
          <div
            class="footer"
            style="
              clear: both;
              padding-top: 24px;
              text-align: center;
              width: 100%;
            "
          >
            <table
              role="presentation"
              border="0"
              cellpadding="0"
              cellspacing="0"
              style="
                border-collapse: separate;
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                width: 100%;
              "
              width="100%"
            >
              <tr>
                <td
                  class="content-block"
                  style="
                    font-family: Oxanium, sans-serif;
                    vertical-align: top;
                    color: #9a9ea6;
                    font-size: 16px;
                    text-align: center;
                  "
                  valign="top"
                  align="center"
                >
                  <span
                    class="apple-link"
                    style="
                      color: #9a9ea6;
                      font-size: 16px;
                      text-align: center;
                    "
                    >University of Engineering and Technology, Taxila</span
                  >
                  <br />
                  Don't like these emails?
                  <a href="%%UNSUBSCRIBE%%">unsubscribe</a>.
                </td>
              </tr>
              <tr>
                <td
                  class="content-block powered-by"
                  style="
                    font-family: Oxanium, sans-serif;
                    vertical-align: top;
                    color: #9a9ea6;
                    font-size: 16px;
                    text-align: center;
                  "
                  valign="top"
                  align="center"
                >
                  Powered by
                  <a
                    href="https://www.lostnest.xyz/"
                    style="
                    color: #311465;
                    font-size: 16px;
                    text-align: center;
                    text-decoration: underline;
                    "
                    >LostNest</a
                  >
                </td>
              </tr>
            </table>
          </div>
        </div>
      </td>
      <td
        style="
          font-family: Oxanium, sans-serif;
          font-size: 16px;
          vertical-align: top;
        "
        valign="top"
      >
        &nbsp;
      </td>
    </tr>
  </table>
    </pre>
  </body>
</html>
`;

    const subject = `LostNest Alert: ${enteredType} - ${enteredTitle}`;

    const result = await sendPostData(
      enteredType,
      enteredCategory,
      enteredTitle,
      enteredDescription,
      enteredQuestion,
      humanReadableDate,
      isImage
    );
    if (result.message === "Item Posted Successfully!") {
      const emailres = await sendEmails(subject, message);
    }

    if (result.message === "Item Posted Successfully!") {
      event.target.reset();
      setIsImage(""); // Clear the image state
    }
    setIsLoading(false);
  };

  return (
    <Fragment>
      <ToastContainer autoClose={1500} draggable closeOnClick />
      <form style={{ margin: "0px 5px 0px 5px" }} onSubmit={postSubmitHandler}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-xl font-semibold leading-7 text-gray-900 text-2xl">
              Found an Item??
            </h2>
            <p className="mt-1 text-sm leading-6 text-red-600">
              This information will be displayed publicly so be careful what you
              share.
            </p>
            <div className="border-b border-gray-900/10 pb-12">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="Found"
                    className="block text-lg font-medium leading-6 text-gray-900"
                  >
                    Item type
                  </label>
                  <div className="mt-2">
                    <select
                      id="Found"
                      name="Found"
                      autoComplete="lost-name"
                      ref={typeInputRef}
                      className="block w-full rounded-md border-0 py-4 p-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option value="Found">Found</option>
                    </select>
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="category"
                    className="block text-lg font-medium leading-6 text-gray-900"
                  >
                    Category
                  </label>
                  <div className="mt-2">
                    <select
                      id="category"
                      name="category"
                      autoComplete="category-name"
                      ref={categoryInputRef}
                      className="block w-full rounded-md border-0 py-4 p-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      required
                    >
                      <option value="Wallet">Wallet</option>
                      <option value="Card">
                        ID Card / Student Card
                      </option>
                      <option value="Phone or Laptop">
                        Smart Phone / Laptop
                      </option>
                      <option value="Keys">Keys</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="Itemname"
                    className="block text-lg font-medium leading-6 text-gray-900"
                  >
                    Item Name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="Itemname"
                      style={{ fontSize: "10px" }}
                      id="Itemname"
                      autoComplete="given-name"
                      ref={titleInputRef}
                      className="block w-full rounded-md border-0 py-2.5 p-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      required
                    ></input>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="date"
                    className="block text-lg font-medium leading-6 text-gray-900"
                  >
                    Select a Date
                  </label>
                  <div className="mt-2">
                    <input
                      type="date"
                      name="date"
                      style={{ fontSize: "10px" }}
                      id="date"
                      ref={dateInputRef}
                      className="block w-full rounded-md border-0 py-2.5 p-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      required
                    ></input>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="question"
                    className="block text-lg font-medium leading-6 text-gray-900"
                  >
                    Enter question based on an item.
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="question"
                      style={{ fontSize: "10px" }}
                      id="question"
                      placeholder="Ex:- What is the color of the phone?"
                      ref={questionInputRef}
                      className="block w-full rounded-md border-0 py-2.5 p-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      required
                    ></input>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="Description"
                  className="block text-lg font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="about"
                    name="Description"
                    style={{ fontSize: "10px" }}
                    rows="3"
                    ref={descriptionInputRef}
                    className="block w-full rounded-md border-0 py-1.5 p-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                  ></textarea>
                </div>
                <p className="mt-3 text-lg leading-6 text-gray-600 font-semibold">
                  Write a few sentences about item like location etc.
                </p>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-lg font-medium leading-6 text-gray-900"
                >
                  Item photo
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-300"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={converttobase64}
                        ></input>
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG/JPEG up to 10MB
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-lg leading-6 text-gray-600 font-semibold">
                  Make sure the image you upload doesn't reveal the answer to
                  the security question.
                </p>
              </div>
            </div>
            {fileError && (
              <div
                style={{
                  textAlign: "center",
                  color: "red",
                  fontSize: "1.2rem",
                  marginTop: "1rem",
                }}
              >
                {fileError}
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-purple-950 px-12 py-3 text-xl font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Post
          </button>
        </div>
      </form>

      {isLoading && <Loadings />}
    </Fragment>
  );
}

export default FoundNewItem;
