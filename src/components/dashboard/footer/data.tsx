import { FaWallet, FaMoneyBillTransfer } from "react-icons/fa6";
import { MdOutlineEventNote } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

export const fMenuLink = [
    {
      label: "Home",
      icon: <FaWallet />,
      slug: "/dashboard",
    },
    {
      label: "Transfer",
      icon: <FaMoneyBillTransfer />,
      slug: "/dashboard/transfer",
    },
    {
      label: "Pay Bills",
      icon: <MdOutlineEventNote />,
      slug: "/dashboard/bill-payment",
    },
    {
      label: "Me",
      icon: <CgProfile />,
      slug: "/dashboard/profile",
    },
  ];