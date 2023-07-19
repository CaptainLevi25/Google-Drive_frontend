import React, { useEffect, useState } from "react";
import SwitchRightIcon from "@mui/icons-material/SwitchRight";
import MenuIcon from "@mui/icons-material/Menu";
import DeleteIcon from "@mui/icons-material/Delete";
import IosShareIcon from "@mui/icons-material/IosShare";
import RestoreIcon from "@mui/icons-material/Restore";
import axios from "axios";
import "./Homepage.css";
import CloseIcon from "@mui/icons-material/Close";
import { Input, List, TextField } from "@mui/material";
import UnfoldMoreDoubleIcon from "@mui/icons-material/UnfoldMoreDouble";
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
const Card = ({ ind, sour, account, provider, contract }) => {
  const [open, setopen] = useState(false);
  const [delmodal, setdelmodal] = useState(false);
  const [whohasaccess, setwhohasaccess] = useState(false);
  const [add, setadd] = useState(null);
  const [addm, setaddm] = useState(null);
  const [adddel, setadddel] = useState(null);

  const del = async (inn) => {
    //    const address = document.querySelector(".address").value;
    //    console.log(address)

    try {
      await contract.removeOtherAccess(inn, adddel);
    } catch {
      alert("This address do have access to your account");
    }
  };

  const sharing = async (inde) => {
    //    const address = document.querySelector(".address").value;
    //    console.log(address)

    try {
      await contract.giveOtherAccess(inde, addm);
    } catch {
      alert("sorry could not share");
    }
  };

  const accessList = async (im) => {
    try {
      const addressList = await contract.checkWhoHasAccess(im);
      const alladdressList = await Promise.all(
        addressList.map((player) => {
          return player;
        })
      );

      // console.log(addressList);
      setadd(addressList);
      console.log(add);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    accessList(ind);
  }, [whohasaccess]);
  const movetobin = async (indexx) => {
    try {
      await contract.moveToTrash(indexx);
    } catch {
      alert("could not delete");
    }
  };
  return (
    <>
      <div className="card">
        <div className="img-area">
         <a target="_blank" href={sour}> <img
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
            src={sour}
            alt=""
            onError={e => { e.currentTarget.src = "https://www.shutterstock.com/image-vector/pdf-icon-major-file-format-260nw-1903798216.jpg"; }}

          />
          </a>
        </div>
        <div className="option-area">
          <div className="deleteicon" style={{ color: "white" }}>
            <button
              onClick={() => {
                setopen(!open);
              }}
              style={{ all: "unset", cursor: "pointer" }}
            >
              <IosShareIcon fontSize="large" />
            </button>
          </div>
          <div className="deleteicon" style={{ color: "white" }}>
            <button
              onClick={() => {
                setdelmodal(!delmodal);
              }}
              style={{ all: "unset", cursor: "pointer" }}
            >
              {" "}
              <DeleteIcon fontSize="large" />
            </button>
          </div>
          <div className="deleteicon" style={{ color: "white" }}>
            <button
              onClick={() => {
                accessList(ind);
                setwhohasaccess(!whohasaccess);
              }}
              style={{ all: "unset", cursor: "pointer" }}
            >
              {" "}
              <UnfoldMoreDoubleIcon fontSize="large" />
            </button>
          </div>
        </div>
        {open && (
          <div className="short-modal">
            <div>
              <TextField
                onChange={(e) => {
                  setaddm(e.target.value);
                }}
                id="standard-basic"
                label="Type The Address"
                variant="standard"
              />
            </div>
            <div>
              <button
                onClick={() => {
                  sharing(ind);
                }}
                style={{ all: "unset", cursor: "pointer" }}
              >
                <IosShareIcon fontSize="large" />
              </button>
            </div>
            <div>
              <h4>Secret Doc No #{ind}</h4>
            </div>
          </div>
        )}
        {delmodal && (
          <div className="short-modal">
            <div>
              <h1>Delete this Image</h1>
            </div>
            <div>
              <button
                onClick={() => {
                  movetobin(ind); //////////////////// Move To Bin/////////////////
                }}
                style={{ all: "unset", cursor: "pointer" }}
              >
                {" "}
                <DeleteIcon fontSize="large" />
              </button>
            </div>
          </div>
        )}
        {whohasaccess && (
          <div className="access">
            <div className="cross">
              <button
                onClick={() => {
                  setwhohasaccess(false);
                }}
                style={{ all: "unset", cursor: "pointer" }}
              >
                {" "}
                <CloseIcon fontSize="medium" />{" "}
              </button>
            </div>
            <div className="addresslist">
              <h2>Access Given to</h2>
              {add ? (
                add.map((item, i) => {
                  return (
                    <div className="shownlist">
                      <h4 style={{ color: "white" }}>
                        {item !==
                          "0x0000000000000000000000000000000000000000" && item}
                      </h4>
                    </div>
                  );
                })
              ) : (
                <h1 style={{ color: "white" }}>Empty list</h1>
              )}
            </div>
            <div className="delete-area">
              <div>
                {" "}
                <TextField
                  onChange={(e) => {
                    setadddel(e.target.value);
                  }}
                  id="filled-basic"
                  label="Delete this address"
                  variant="filled"
                />
              </div>
              <div className="delete-area-2ndchild">
                <button
                  style={{ all: "unset", cursor: "pointer" }}
                  onClick={() => del(ind)}
                >
                  <DeleteIcon fontSize="large" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
const CardO = ({ sourr }) => {
  return (
    <>
      <div className="cardr1">
        <div className="img-arear1">
          {/* <h1 style={{ color: "white" }}>hello </h1> */}
          <img
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
            src={sourr}
            alt=""
            onError={e => { e.currentTarget.src = "https://www.shutterstock.com/image-vector/pdf-icon-major-file-format-260nw-1903798216.jpg"; }}
          />
        </div>
        <div className="option-arear1">
          <div className="deleteicon1" style={{ color: "white" }}>
            <button
              onClick={() => {
                // setopen(!open);
              }}
              style={{ all: "unset", cursor: "pointer" }}
            >
              {/* <RestoreIcon fontSize="large" /> */}
            </button>
          </div>
          <div className="deleteicon1" style={{ color: "white" }}>
            <button
              onClick={() => {
                //   setdelmodal(!delmodal);
              }}
              style={{ all: "unset", cursor: "pointer" }}
            >
              {" "}
              {/* <DeleteIcon fontSize="large" /> */}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const CardR = ({ ind, sour, account, provider, contract }) => {
  const [open, setopen] = useState(false);
  const [delmodal, setdelmodal] = useState(false);
  const pmovetobin = async (indd) => {
    try {
      await contract.permanentDelete(indd);
    } catch {
      alert("could not delete");
    }
  };

  const restore = async (ik) => {
    try {
      await contract.restoreFromTrash(ik);
    } catch {
      alert("sorry could not restore");
    }
  };
    
  return (
    <>
      <div className="cardr">
        <div className="img-arear">
          {/* <h1 style={{ color: "white" }}>hello </h1> */}
          <img
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
            src={sour}
            alt=""
            onError={e => { e.currentTarget.src = "https://www.shutterstock.com/image-vector/pdf-icon-major-file-format-260nw-1903798216.jpg"; }}
          />
        </div>
        <div className="option-arear">
          <div className="deleteicon" style={{ color: "white" }}>
            <button
              onClick={() => {
                setopen(!open);
              }}
              style={{ all: "unset", cursor: "pointer" }}
            >
              <RestoreIcon fontSize="large" />
            </button>
          </div>
          <div className="deleteicon" style={{ color: "white" }}>
            <button
              onClick={() => {
                setdelmodal(!delmodal);
              }}
              style={{ all: "unset", cursor: "pointer" }}
            >
              {" "}
              <DeleteIcon fontSize="large" />
            </button>
          </div>
        </div>
        {open && (
          <div className="short-modalr">
            <div>
              <h1>Restore this Image</h1>
            </div>
            <div>
              <button
                onClick={() => {
                  restore(ind); /*restore*/
                }}
                style={{ all: "unset", cursor: "pointer" }}
              >
                <RestoreIcon fontSize="large" />
              </button>
            </div>
          </div>
        )}
        {delmodal && (
          <div className="short-modal">
            <div>
              <h1>Delete this Image</h1>
            </div>
            <div>
              <button
                onClick={()=>
                  {
                    /*Permanent  Delete Function*/
                      pmovetobin(ind);
                  }
                }
                style={{ all: "unset", cursor: "pointer" }}
              >
                {" "}
                <DeleteIcon fontSize="large" />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const Homepage = ({ account, provider, contract }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedItem, setSelectedItem] = useState(1);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = (item) => {
    setSelectedItem(item);
  };
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `6c3c811316bb4d061717`,
            pinata_secret_api_key: `92b91a47ba5b611b008f934a2bab15d1b7361f0b430a4b96c36485e0c72f9fbf`,
            "Content-Type": "multipart/form-data",
          },
        });
        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        contract.uploadFile(ImgHash);
        alert("Successfully Image Uploaded");
        setFileName("No image selected");
        setFile(null);
      } catch (e) {
        alert("Unable to upload image to Pinata");
      }
    }
   // alert("Successfully Image Uploaded");
    setFileName("No image selected");
    setFile(null);
  };
  const retrieveFile = (e) => {
    const data = e.target.files[0]; //files array of files object
    // console.log(data);
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    setFileName(e.target.files[0].name);
    e.preventDefault();
  };

  const [data, setdata] = useState(null);
  const [trash, setTrash] = useState(null);
  const getdata = async () => {
    try {
      let datarray = await contract.getMyFiles();
      if (datarray) {
        const str = datarray.toString();
        const str_array = str.split(",");
        //console.log(str_array);
        // const images = str_array.map((item,i)=>{

        //     <a href={item} key={i} target='_blank' src={item}>
        //         <img key={i} src={item} />
        //     </a>
        // })
        setdata(str_array);
        /// console.log("hello");
        //console.log(data);
      }
    } catch {
      console.log("could not find anything");
    }
  };
  const getTrash = async () => {
    try {
      let datarray = await contract.seeTrashFiles();
      if (datarray) {
        const str = datarray.toString();
        const str_array = str.split(",");
        //console.log(str_array);
        // const images = str_array.map((item,i)=>{

        //     <a href={item} key={i} target='_blank' src={item}>
        //         <img key={i} src={item} />
        //     </a>
        // })
        setTrash(str_array);
        //   console.log("hello");
        // console.log(data);
      }
    } catch {
      console.log("could not find anything");
    }
  };

  useEffect(() => {
    getdata();
  }, [account, selectedItem]);
  useEffect(() => {
    getTrash();
  }, [selectedItem, account]);
  const [n, setn] = useState(false);
  const [text, setText] = useState("");
  const [textt, setTextt] = useState("");
  const [dataa, setdataa] = useState(null);
  const getotherdata = async () => {
    try {
      let datarray = await contract.getOthersFiles(textt, text);
      if (datarray) {
        const str = datarray.toString();
        const str_array = str.split(",");
        //console.log(str_array);
        // const images = str_array.map((item,i)=>{

        //     <a href={item} key={i} target='_blank' src={item}>
        //         <img key={i} src={item} />
        //     </a>
        // })
        setdataa(str_array);
        /// console.log("hello");
        //console.log(data);
        setn(true);
      }
    } catch {
      console.log("could not find anything");
    }
  };
  return (
    <div className="homepage">
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="deleteall">
              
              
              <button style={{all:"unset",cursor:"pointer"}} onClick={async()=>{
                 try{

                      await contract.emptyTrashCan();
                 }catch{
                  alert("sorry could not empty trash");
                 }


              }}>

              <div className="nama">
                
                <DeleteIcon fontSize="large"/> <span> <h2>
                  Empty Trash
                  </h2>
                  </span>

                </div>  
               
              </button>
          </div>
        <ul>
          <li
            className={selectedItem === 1 ? "selected" : ""}
            onClick={() => handleMenuItemClick(1)}
          >
            <div style={{display:"flex",justifyContent:"space-evenly",alignItems:"center"}}>
            
             <FactCheckIcon fontSize="large"/> <span>Personal Documents</span>
            </div>
          </li>
          <li
            className={selectedItem === 2 ? "selected" : ""}
            onClick={() => handleMenuItemClick(2)}
          >
           <div style={{display:"flex",justifyContent:"space-evenly",alignItems:"center"}}>
            
            <AddPhotoAlternateIcon fontSize="large"/> <span>Upload Documents</span>
           </div>
          </li>
          <li
            className={selectedItem === 3 ? "selected" : ""}
            onClick={() => handleMenuItemClick(3)}
          >
             <div style={{display:"flex",justifyContent:"space-evenly",alignItems:"center"}}>
            
            <AutoDeleteIcon fontSize="large"/> <span>Deleted Documents</span>
           </div>
          </li>
          <li
            className={selectedItem === 4 ? "selected" : ""}
            onClick={() => handleMenuItemClick(4)}
          >
             <div style={{display:"flex",justifyContent:"space-evenly",alignItems:"center"}}>
            
            <FileDownloadIcon fontSize="large"/> <span>Others Documents</span>
           </div>
          </li>
        </ul>
      </div>
      {/*///////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
      {selectedItem === 1 && (
        <div className="main-content1">
          {/* <h1>Main Content1</h1> */}
          {/* Update the content1 content here */}
       
          {data &&
            data.map((item, index) => {
              return (
                item !== "Deleted" && (
                  <Card
                    ind={index}
                    sour={item}
                    account={account}
                    provider={provider}
                    contract={contract}
                  />
                )
              );
            })}
        </div>
      )}
      {/*///////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
      {selectedItem === 2 && (
        <div className="main-content2">
          <div className="heading">
            <h1>Drag and drop files Here</h1>
          </div>
          <div className="infobox">
            <div className="rotated-image">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/768px-MetaMask_Fox.svg.png?20220831120339"
                alt=""
                srcset=""
              />
            </div>
            <div className="inpuut">
              <form className="form" onSubmit={handleSubmit}>
                <label htmlFor="file-upload" className="fill-button">
                  Choose Image
                </label>
                <input
                  disabled={!account}
                  type="file"
                  id="file-upload"
                  name="data"
                  onChange={retrieveFile}
                />
                <div className="textArea">Image:{fileName}</div>
                <button type="submit" className="upload" disabled={!file}>
                  Upload File
                </button>
              </form>

             
            </div>
          </div>
        </div>
      )}
      {/*///////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
      {selectedItem === 3 && (
        <>
        <div className="main-content3">
          {/* <h1>Main Content3</h1> */}
          {trash ?(
          
            trash.map((item, index) => {
              return (
                item !== "Deleted" && (
                  <CardR
                    ind={index}
                    sour={item}
                    account={account}
                    provider={provider}
                    contract={contract}
                  />
                )
              );
            })): (<h1>Empty Trash</h1>)}
       
           
          {/* Update the content3 content here */}

        
        </div>
</>
      )}
      {/*///////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
      {selectedItem === 4 && (
        <div className="main-content4">
          {!n ? (
            <>
              <h1 style={{ color: "white" }} className="heading33">
                Others Information
              </h1>
              <div className="infobox3">
                <div className="rotated-image3">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/768px-MetaMask_Fox.svg.png?20220831120339"
                    alt=""
                    srcset=""
                  />
                </div>
                <div className="inpuut3">
                  <h1 style={{color:"white"}}>See Others allowed documents</h1>

                  <TextField
                    className="address3"
                    fullWidth
                    label="Address"
                    id="fullWidth"
                    onChange={(e) => {
                      setText(e.target.value);
                      console.log(e.target.value);
                    }}
                  />
                  <TextField
                    className="address3"
                    fullWidth
                    label="Secret Doc NO"
                    id="fullWidth"
                    onChange={(e) => {
                      setTextt(e.target.value);
                      console.log(e.target.value);
                    }}
                  />
                  <button
                    onClick={() => {
                      getotherdata();
                    }}
                    class="fill-button3"
                  >
                    Get other Documents
                  </button>
                  {/* <button class = "fill-button1" >Acess the  Government list</button> */}
                  {/* {
                    list && list.map((item,i)=>{
                        return()
                    })
                } */}
                </div>
              </div>
            </>
          ) : (
            <div>
              {dataa ? (
                dataa.map((item, i) => {
                  return <CardO sourr={item} />;
                })
              ) : (
                <h1 style={{ color: "white" }}>Null</h1>
              )}
              <div>
                <button
                  onClick={() => {
                    setn(false);
                  }}
                  className="fill-button3"
                >
                  Go back
                </button>
              </div>
            </div>
          )}
          {/* Update the content3 content here */}
        </div>
      )}
      {/*/////////////////////////////////////////////////////////////////////////////////////////*/}
    </div>
  );
};

export default Homepage;
