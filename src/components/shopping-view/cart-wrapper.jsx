import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemContent from "./cart-items-content";

function UserCardWrapper({ cartItems, setOpenCartSheet }) {
  const navigate = useNavigate();

  const totalAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem.salePrice
              : currentItem?.price) *
              currentItem.quantity,
          0
        )
      : 0;

  return (
    <SheetContent className="sm:max-w-md">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>

      {/* Scrollable container */}
      <div className="mt-8 space-y-4 max-h-[400px] overflow-y-auto pr-2">
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item) => (
            <UserCartItemContent key={item.id} cartItem={item} />
          ))
        ) : (
          <p className="text-sm text-gray-500">Your cart is empty.</p>
        )}
      </div>

      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">{totalAmount}</span>
        </div>
      </div>

      <Button
        onClick={() => {
          navigate("/shop/checkout");
          setOpenCartSheet(false);
        }}
        className="w-full mt-6"
      >
        CheckOut
      </Button>
    </SheetContent>
  );
}

export default UserCardWrapper;
