import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import React from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const CommonForm = ({
  formControls,
  formData,
  isBtnDisabled,
  setFormData,
  onSubmit,
  buttonText,
}) => {
  function renderInput(getcontrollItem) {
    let element = null;
    const value = FormData[getcontrollItem.name] || "";

    switch (getcontrollItem.componentType) {
      case "input":
        element = (
          <Input
            name={getcontrollItem.name}
            placeholder={getcontrollItem.placeholder}
            id={getcontrollItem.name}
            type={getcontrollItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getcontrollItem.name]: event.target.value,
              })
            }
          />
        );
        break;

      case "select":
        element = (
          <Select
            onValueChange={(value) =>
              setFormData({ ...formData, [getcontrollItem.name]: value })
            }
            value={value}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getcontrollItem.label} />
            </SelectTrigger>
            <SelectContent>
              {getcontrollItem.options && getcontrollItem.options.length > 0
                ? getcontrollItem.options.map((optionitem) => (
                    <SelectItem key={optionitem.id} value={optionitem.id}>
                      {optionitem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );

        break;
      case "textarea":
        element = (
          <Textarea
            name={getcontrollItem.name}
            placeholder={getcontrollItem.placeholder}
            id={getcontrollItem.id}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getcontrollItem.name]: event.target.value,
              })
            }
          />
        );
        break;

      default:
        element = (
          <Input
            name={getcontrollItem.name}
            placeholder={getcontrollItem.placeholder}
            id={getcontrollItem.name}
            type={getcontrollItem.type}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getcontrollItem.name]: event.target.value,
              })
            }
          />
        );
        break;
    }
    return element;
  }
  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map((controlItem) => (
          <div className="grid w-full gap-1.5" key={controlItem.name}>
            <Label className="mb-1">{controlItem.label}</Label>
            {renderInput(controlItem)}
          </div>
        ))}
      </div>
      <Button disabled={isBtnDisabled} type="submit" className="mt-2 w-full">
        {buttonText || "Submit"}
      </Button>
    </form>
  );
};

export default CommonForm;
