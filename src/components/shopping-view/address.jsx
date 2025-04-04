import { useEffect, useState } from "react";
import CommonForm from "../common/form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewAddress,
  deleteAddress,
  fetchAllAddresses,
} from "@/store/shop/address-slice";
import AddressCard from "./address-cart";

const initalAddressFormData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
};

function Address() {
  const [formData, setFormData] = useState(initalAddressFormData);

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const { addressList } = useSelector((state) => state.shopAddress);

  function hadndleManageAddress(event) {
    event.preventDefault();
    dispatch(
      addNewAddress({
        ...formData,
        userId: user?.id,
      })
    ).then((data) => {
      console.log(data);
      if (data?.payload?.success) {
        dispatch(fetchAllAddresses(user?.id));
        setFormData(initalAddressFormData);
      }
    });
  }

  function handleDeleteAddress(getCurrentAddress) {
    dispatch(
      deleteAddress({ userId: user?.id, addressId: getCurrentAddress._id })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddresses(user?.id));
      }
    });
  }

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key].trim() !== "")
      .every((item) => item);
  }

  useEffect(() => {
    dispatch(fetchAllAddresses(user?.id));
  }, [dispatch]);

  console.log(addressList, "addressList");

  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {addressList && addressList.length > 0
          ? addressList.map((singleAddressItem) => (
              <AddressCard
                key={singleAddressItem.id}
                handleDeleteAddress={handleDeleteAddress}
                addressInfo={singleAddressItem}
              />
            ))
          : null}
      </div>
      <CardHeader>
        <CardTitle>Add New Address</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={"Add"}
          onSubmit={hadndleManageAddress}
          isBtnDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
}

export default Address;
