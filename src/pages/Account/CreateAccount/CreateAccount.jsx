import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { API } from "../../../api";
import toast from "react-hot-toast";
import { AxiosSecure } from "../../../lib/AxiosSecure";
import { userType } from "../../../static/userType";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const CreateAccount = () => {
  const [validUser, setValidUser] = useState(false);
  const { role } = useSelector((state) => state.auth);
  const index = userType.findIndex((item) => item.value === role);
  const roleData = userType.slice(index + 1);

  const navigate = useNavigate();
  const { register, handleSubmit, reset, watch } = useForm();
  const username = watch("username");

  useEffect(() => {
    const checkUserValidity = async () => {
      const { data } = await AxiosSecure.post(API.checkUsername, { username });
      if (data.success) {
        setValidUser(true);
      } else {
        setValidUser(false);
      }
    };
    checkUserValidity();
  }, [username]);

  const onSubmit = async (fieldValues) => {
    if (username.length === 0 || !validUser) {
      setValidUser(false);
      return;
    }

    const { data } = await AxiosSecure.post(API.createDownLine, fieldValues);
    if (data?.success) {
      navigate("/account-list");
    } else {
      toast.error(data?.error?.status[0]?.description);
    }
  };
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <h4 className="py-3 breadcrumb-wrapper mb-4">
        <span className="text-muted fw-light">Home /</span> Create Account
      </h4>

      <div className="row">
        <div className="col-xxl">
          <div className="card mb-4">
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label" htmlFor="username">
                    Username *
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      {...register("username", {
                        required: true,
                      })}
                      className={`form-control animation ${
                        validUser ? "is-valid" : "is-invalid"
                      }`}
                      id="username"
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label" htmlFor="password">
                    Password *
                  </label>
                  <div className="col-sm-10" style={{ position: "relative" }}>
                    <input
                      type="text"
                      {...register("password", {
                        required: true,
                      })}
                      className="form-control"
                      id="password"
                    />
                    <button
                      type="button"
                      onClick={() => reset({ password: "Abcd1234" })}
                      style={{
                        position: "absolute",
                        top: "7px",
                        right: "20px",
                      }}
                      className="btn btn-primary btn-xs"
                    >
                      Default Password
                    </button>
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label" htmlFor="fullName">
                    Full Name
                  </label>
                  <div className="col-sm-10" style={{ position: "relative" }}>
                    <input
                      type="text"
                      {...register("fullName", {
                        required: true,
                      })}
                      className="form-control"
                      id="fullName"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label" htmlFor="userType">
                    User Type *
                  </label>
                  <div className="col-sm-10" style={{ position: "relative" }}>
                    <select className="form-control" name="" id="userType">
                      <option value="">Select User Type</option>
                      {roleData?.map((role, i) => {
                        return (
                          <option key={i} value={role?.value}>
                            {role?.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>

                <div className="row mb-3">
                  <label
                    className="col-sm-2 col-form-label"
                    htmlFor="transactionCode"
                  >
                    Transaction Code
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      {...register("transactionCode")}
                      className="form-control"
                      id="transactionCode"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label" htmlFor="city">
                    City
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      {...register("city")}
                      className="form-control"
                      id="city"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    className="col-sm-2 col-form-label"
                    htmlFor="mobileNumber"
                  >
                    Mobile Number
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="number"
                      {...register("mobileNumber")}
                      className="form-control"
                      id="mobileNumber"
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label" htmlFor="remark">
                    Remark
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      {...register("remark")}
                      className="form-control"
                      id="remark"
                    />
                  </div>
                </div>

                <div className="row justify-content-end">
                  <div className="col-sm-10">
                    <input
                      disabled={!validUser}
                      type="submit"
                      name="submit"
                      value="Submit"
                      className="btn btn-primary"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
