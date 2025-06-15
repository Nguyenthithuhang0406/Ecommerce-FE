/* eslint-disable*/
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { getConfirmedOrder } from "@/api/orderAPI/order";
import { toast } from "react-toastify";

export default function Payment() {
  const [searchParams] = useSearchParams();
  const message = searchParams.get("message");
  const vnp_TransactionStatus = searchParams.get("vnp_TransactionStatus");

  useEffect(() => {
    const senConfirmedOrder = async () => {
      if (message || vnp_TransactionStatus) {
        try {
          const response = await getConfirmedOrder(searchParams.toString());
        } catch (error) {
          console.log("Error fetching confirmed order:", error);
        }
      }
    };
    senConfirmedOrder();
  }, [message, vnp_TransactionStatus, searchParams]);

  return (
    <div className="w-[500px] h-[300px] shadow-2xl rounded-lg p-3 flex flex-col items-center justify-center">
      <h2 className="text-[20px] text-amber-800 mb-[20px]">
        Kết quả thanh toán
      </h2>
      {message === "Successful." || vnp_TransactionStatus === "00" ? (
        <img
          src="https://img.icons8.com/ios7/600/40C057/ok.png"
          alt="Success"
          className="w-16 h-16 mb-4"
        />
      ) : (
        <img
          src="https://www.kindpng.com/picc/m/663-6635780_icon-failure-red-cross-image-download-hd-png.png"
          alt="Error"
          className="w-16 h-16 mb-4"
        />
      )}
      <p>
        <span
          className={
            message === "Successful." || vnp_TransactionStatus === "00"
              ? "text-green-500"
              : "text-red-500"
          }
        >
          {message === "Successful." || vnp_TransactionStatus === "00"
            ? "Thanh toán thành công"
            : "Thanh toán thất bại"}
        </span>
      </p>
    </div>
  );
}
