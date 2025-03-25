import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { API } from "../../api";
import { useState } from "react";
import { AxiosSecure } from "../../lib/AxiosSecure";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/auth/authSlice";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  /* handle change password  */
  const onSubmit = async ({
    transactionCode,
    newPassword,
    confirmPassword,
  }) => {
    const payload = {
      newPassword: newPassword,
      confirmPassword: confirmPassword,
      mpassword: transactionCode,
      type: "panel",
    };
    const res = await AxiosSecure.post(API.changePassword, payload);
    const data = res.data;

    if (data?.success) {
      toast.success(data?.result?.message);

      dispatch(logout());
      navigate("/login");
    } else {
      toast.error(data?.error?.status?.[0]?.description);
    }
  };
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <h4 className="py-3 breadcrumb-wrapper mb-4">
        <span className="text-muted fw-light">Home /</span> Change Password
      </h4>

      <div className="row">
        <div className="col-xxl">
          <div className="card mb-4">
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row mb-3" id="bank_account_name_div">
                  <label
                    className="col-sm-2 col-form-label"
                    htmlFor="basic-default-name"
                  >
                    Transaction Code *
                  </label>
                  <div className="col-sm-10" style={{ position: "relative" }}>
                    <input
                      type={"text"}
                      {...register("transactionCode", {
                        required: true,
                      })}
                      className="form-control"
                      id="basic-default-name"
                    />
                    <span
                      style={{
                        position: "absolute",
                        top: "5px",
                        right: "25px",
                        cursor: "pointer",
                      }}
                      onClick={() => setShowOldPassword((prev) => !prev)}
                    >
                      <i
                        className={`bx ${
                          showOldPassword ? "bx-show" : "bx-hide"
                        }`}
                      ></i>
                    </span>
                  </div>
                </div>

                <div className="row mb-3" id="bank_account_name_div">
                  <label
                    className="col-sm-2 col-form-label"
                    htmlFor="basic-default-name"
                  >
                    New Password *
                  </label>
                  <div className="col-sm-10" style={{ position: "relative" }}>
                    <input
                      {...register("newPassword", {
                        required: true,
                      })}
                      type={showNewPassword ? "text" : "password"}
                      className="form-control"
                      id="basic-default-name"
                    />
                    <span
                      style={{
                        position: "absolute",
                        top: "5px",
                        right: "25px",
                        cursor: "pointer",
                      }}
                      onClick={() => setShowNewPassword((prev) => !prev)}
                    >
                      <i
                        className={`bx ${
                          showNewPassword ? "bx-show" : "bx-hide"
                        }`}
                      ></i>
                    </span>
                  </div>
                </div>

                <div className="row mb-3" id="bank_account_name_div">
                  <label
                    className="col-sm-2 col-form-label"
                    htmlFor="basic-default-name"
                  >
                    Confirm New Password *
                  </label>
                  <div className="col-sm-10" style={{ position: "relative" }}>
                    <input
                      {...register("confirmPassword", {
                        required: true,
                      })}
                      type={showConfirmPassword ? "text" : "password"}
                      className="form-control"
                      id="basic-default-name"
                    />
                    <span
                      style={{
                        position: "absolute",
                        top: "5px",
                        right: "25px",
                        cursor: "pointer",
                      }}
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                    >
                      <i
                        className={`bx ${
                          showConfirmPassword ? "bx-show" : "bx-hide"
                        }`}
                      ></i>
                    </span>
                  </div>
                </div>

                <div className="row justify-content-end">
                  <div className="col-sm-10">
                    <input
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

export default ChangePassword;
