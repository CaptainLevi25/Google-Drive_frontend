// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

contract GoogleDrive{

    address[] Users;
    mapping (uint=>string[]) files;
    mapping (uint=>mapping(uint=>address[])) public allowedAddress;
    mapping (uint=>string[]) deletedFiles; 
    function checksWhetherUserIsRegistered(address sender) internal view returns(bool){
        for(uint i = 0 ;i < Users.length;i++){
            if(Users[i]==sender){
                return true;
            }
        }
        return false;
    }

    function getIndexFromAddress(address sender) internal view returns(uint){
        int index = -1;
        for(uint i = 0 ;i < Users.length;i++){
            if(Users[i]==sender){
               index = int(i);
            }
        }
        return uint(index);
    }

    function stringEqualityChecker(string memory str1 , string memory str2) internal pure returns(bool){
        return keccak256(abi.encodePacked(str1)) == keccak256(abi.encodePacked(str2));
    }

    function toGetAddressIndexInAllowedArray(uint ownerIndex,uint fileIndex,address toCheckStatus) view internal returns(uint){
        for(uint i = 0 ; i<allowedAddress[ownerIndex][fileIndex].length;i++){
            if(allowedAddress[ownerIndex][fileIndex][i]==toCheckStatus){
                return i+1;
            }
        }
        return 0;
    }

    function Resgister() public {
        require(!checksWhetherUserIsRegistered(msg.sender),"You are already registered");
        Users.push(msg.sender);
        files[getIndexFromAddress(msg.sender)].push("Deleted");
        deletedFiles[getIndexFromAddress(msg.sender)].push("Deleted");
    }

    function uploadFile(string memory fileLink) public {
        require(checksWhetherUserIsRegistered(msg.sender),"You are not registered");
        files[getIndexFromAddress(msg.sender)].push(fileLink);
    }

    function getMyFiles() public view returns(string[] memory){
        require(checksWhetherUserIsRegistered(msg.sender),"You are not registered");
        return files[getIndexFromAddress(msg.sender)];
    }

    function moveToTrash(uint index) public {
        require(checksWhetherUserIsRegistered(msg.sender),"You are not registered");
        uint userIndex = getIndexFromAddress(msg.sender);
        require(index < files[userIndex].length&& !stringEqualityChecker(files[userIndex][index],"Deleted"),"Invalid");
        deletedFiles[userIndex].push(files[userIndex][index]);
        files[userIndex][index]="Deleted";
        delete allowedAddress[userIndex][index];
    }

    function giveOtherAccess(uint fileIndex , address addressToAllow) public{
        uint userIndex = getIndexFromAddress(msg.sender) ;
        require(fileIndex<files[userIndex].length&&!stringEqualityChecker(files[userIndex][fileIndex],"Deleted") , "Invalid");
        allowedAddress[userIndex][fileIndex].push(addressToAllow);
    }

    function checkWhoHasAccess(uint fileIndex)public view returns(address[] memory){
        uint userIndex = getIndexFromAddress(msg.sender) ;
        require(fileIndex<files[userIndex].length&&!stringEqualityChecker(files[userIndex][fileIndex],"Deleted") , "Invalid");
        return allowedAddress[userIndex][fileIndex];
    }

    function removeOtherAccess(uint fileIndex , address addressToRemove) public {
        uint userIndex = getIndexFromAddress(msg.sender) ;
        require(fileIndex<files[userIndex].length , "Invalid");
        uint indexOfAddressToBeRemoved = toGetAddressIndexInAllowedArray(userIndex,fileIndex,addressToRemove);
        require(indexOfAddressToBeRemoved>0,"This Address is not having access");
        allowedAddress[userIndex][fileIndex][indexOfAddressToBeRemoved-1]=address(0);
    }

    function getOthersFiles(uint fileIndex , address addressOfOwner) public view returns(string memory){
        uint ownerIndex = getIndexFromAddress(addressOfOwner) ;
        require(fileIndex<files[ownerIndex].length , "Invalid");
        require(checksWhetherUserIsRegistered(addressOfOwner),"Address invalid");
        uint index = toGetAddressIndexInAllowedArray(ownerIndex,fileIndex,msg.sender);
        require(index>0,"No Access");
        return files[ownerIndex][fileIndex];
    }

    function permanentDelete(uint fileIndex) public {
        uint ownerIndex = getIndexFromAddress(msg.sender) ;
        require(fileIndex<deletedFiles[ownerIndex].length , "Invalid");
        require(!stringEqualityChecker(deletedFiles[ownerIndex][fileIndex] , "Deleted"),"Already Deleted");
        deletedFiles[ownerIndex][fileIndex] = "Deleted";
    } 

    function seeTrashFiles() public view returns(string[] memory){
        uint ownerIndex = getIndexFromAddress(msg.sender) ;
        require(checksWhetherUserIsRegistered(msg.sender),"You are not registered");
        return deletedFiles[ownerIndex];
    }

  function emptyTrashCan() public {
        uint ownerIndex = getIndexFromAddress(msg.sender) ;
        delete deletedFiles[ownerIndex] ;
deletedFiles[ownerIndex].push("Deleted");    
}


    function restoreFromTrash(uint fileIndex) public {
        uint ownerIndex = getIndexFromAddress(msg.sender) ;
        require(fileIndex<deletedFiles[ownerIndex].length , "Invalid");
        require(!stringEqualityChecker(deletedFiles[ownerIndex][fileIndex] , "Deleted"));
        files[ownerIndex].push(deletedFiles[ownerIndex][fileIndex]);
         deletedFiles[ownerIndex][fileIndex] = "Deleted";
    }

    
 }