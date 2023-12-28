// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract MyToken is ERC20Burnable{
    address public own;
    constructor() ERC20("xyzERC20", "XYZ"){
        own = msg.sender;
        _mint(msg.sender, 400);
    }
}


