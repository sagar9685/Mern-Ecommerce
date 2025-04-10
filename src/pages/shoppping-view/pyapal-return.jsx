import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { captuePayment } from "../../store/shop/order-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

function PaypalReturnPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");

  useEffect(() => {
    console.log("paymentId:", paymentId);
    console.log("payerId:", payerId);
    const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));
    console.log("orderId:", orderId);
    if (paymentId && payerId) {
      dispatch(captuePayment({ paymentId, payerId, orderId })).then((data) => {
        console.log("captuePayment response:", data);

        if (data?.payload?.success) {
          sessionStorage.removeItem("currentOrderId");
          window.location.href = "/shop/payment-success";
        } else {
          console.error("Payment not successful");
        }
      });
    }
  }, [paymentId, payerId, dispatch]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing Payment...Please wait!</CardTitle>
      </CardHeader>
    </Card>
  );
}

export default PaypalReturnPage;
