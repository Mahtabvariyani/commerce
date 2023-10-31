"use client";

import Button from "@/app/components/Button";
import Heading from "@/app/components/Heading";
import SelectColor from "@/app/components/SelectColor";
import CategoriesInput from "@/app/components/inputs/CategoriesInput";
import CustomCheckBox from "@/app/components/inputs/CustomCheckBox";
import Input from "@/app/components/inputs/Input";
import TextArea from "@/app/components/inputs/TextArea";
import { colors } from "@/utils/Color";
import { categories } from "@/utils/categories";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import firebaseApp from "@/libs/firebase";
import axios from "axios";
import { useRouter } from "next/navigation";

export type ImageType = {
  color: string;
  colorCode: string;
  image: File | null;
};

export type UploadedImageType = {
  color: string;
  colorCode: string;
  image: string;
};

const AddProcustForm = () => {
  const router = useRouter();
  const [images, setImages] = useState<ImageType[] | null>();
  const [isProductCreated, setIsProductCreated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  console.log("images>>>>>>>>>", images);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      brand: "",
      category: "",
      inStock: false,
      images: [],
    },
  });

  useEffect(() => {
    setCustomtValue("images", images);
  }, [images]);

  useEffect(() => {
    if (isProductCreated) {
      reset();
      setImages(null);
      setIsProductCreated(false);
    }
  }, [isProductCreated]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log("data>>>>>>>>>>>>>>>", data);

    setIsLoading(true);
    let uploadedImages: UploadedImageType[] = [];
    if (!data.category) {
      setIsLoading(false);
      return toast.error("Category is not selected");
    }

    if (!data.images || data.images === 0) {
      setIsLoading(false);
      toast.error("No selected Image");
    }

    const handleImageUploads = async () => {
      toast("Creating Product wait...");
      try {
        for (const item of data.images) {
          if (item.image) {
            const fileName = new Date().getTime() + "-" + item.image.name;

            const storage = getStorage(firebaseApp);
            const storageRef = ref(storage, `products/${fileName}`);
            const uploadTask = uploadBytesResumable(storageRef, item.image);
            await new Promise<void>((resolve, reject) => {
              uploadTask.on(
                "state_changed",
                (snapshot) => {
                  const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  console.log("Upload is " + progress + "% done");
                  switch (snapshot.state) {
                    case "paused":
                      console.log("Upload is paused");
                      break;
                    case "running":
                      console.log("Upload is running");
                      break;
                  }
                },
                (error) => {
                  console.log(error);
                  reject(error);
                },
                () => {
                  getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                      uploadedImages.push({
                        ...item,
                        image: downloadURL,
                      });
                      console.log("File available at", downloadURL);
                      resolve();
                    })
                    .catch((error) => {
                      console.log("error getting the the url", error);
                      reject(error);
                    });
                }
              );
            });
          }
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error);
        return toast.error("Error HAndling Image Upload");
      }
    };
    await handleImageUploads();
    const producData = { ...data, images: uploadedImages };
    axios
      .post("/api/product/", producData)
      .then(() => {
        toast.success("Product was created");
        setIsProductCreated(true);
        router.refresh();
      })
      .catch((error) => {
        toast.error("Something went wrong ");
      }).finally(()=>{
        setIsLoading(false)
      })
    console.log(producData);
  };

  const category = watch("category");

  const setCustomtValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const addImageToState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (!prev) {
        return [value];
      }
      return [...prev, value];
    });
  }, []);

  const removeImageFromState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (prev) {
        const filteredImages = prev.filter(
          (item) => item.color !== value.color
        );
        return filteredImages;
      }
      return prev;
    });
  }, []);

  return (
    <>
      <Heading title="Add a Product" />
      <Input
        id="name"
        lable="Name"
        register={register}
        disabled={isLoading}
        errors={errors}
        required
      />
      <Input
        id="price"
        lable="Price"
        register={register}
        disabled={isLoading}
        errors={errors}
        type="number"
        required
      />
      <Input
        id="brand"
        lable="Brand"
        register={register}
        disabled={isLoading}
        errors={errors}
        required
      />
      <TextArea
        id="description"
        lable="Description"
        register={register}
        disabled={isLoading}
        errors={errors}
        required
      />
      <CustomCheckBox
        id="inStock"
        register={register}
        lable="This Product is in the Stock"
      />
      <div className="w-full font-medium">
        <div className="mb-2  font-semibold">Select Category</div>
        <div className="grid gap-3  grid-cols-2 md:grid-cols-3 max-h[50vh] overflow-y-auto">
          {categories.map((item) => {
            if (item.lable === "All") {
              return null;
            }
            return (
              <div key={item.lable} className="col-span">
                <CategoriesInput
                  onClick={(category) => setCustomtValue("category", category)}
                  selected={category === item.lable}
                  lable={item.lable}
                  icon={item.icon}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full flex flex-col fle-wrap gap-4">
        <div>
          <div className="font-bold">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          </div>
          <div className="text-sm">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum
            delectus voluptate temporibus recusandae dolore doloremque officia,
            dolor alias quis voluptatibus.
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {colors.map((item) => (
            <SelectColor
              key={item.color} // Assigning a unique key based on the color
              item={item}
              addImageToState={addImageToState}
              removeImageFormState={removeImageFromState}
              isProductCreated={isProductCreated}
            />
          ))}
        </div>
      </div>
      <Button
        lable={isLoading ? "Loading..." : "Add Product"}
        onClick={handleSubmit(onSubmit)}
      />
    </>
  );
};

export default AddProcustForm;
