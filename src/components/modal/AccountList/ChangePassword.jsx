import { useRef } from "react";
import useCloseModalClickOutside from "../../../hooks/closeModal";
import { useForm } from "react-hook-form";
import useDownLineEdit from "../../../hooks/downLineEdit";
import toast from "react-hot-toast";

const ChangePassword = ({
  setChangePassword,
  changePassword,
  setRefetchAccount,
}) => {
  const modalRef = useRef();
  useCloseModalClickOutside(modalRef, () => {
    closeModal();
  });
  const { register, handleSubmit } = useForm();

  const { mutate: changePasswordFN } = useDownLineEdit();

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      downlineId: changePassword,
      type: "changePassword",
    };
    changePasswordFN(payload, {
      onSuccess: (data) => {
        if (data?.success) {
          setRefetchAccount((prev) => !prev);
          closeModal();
        } else {
          toast.error(data?.error?.status[0]?.description);
        }
      },
    });
  };

  const closeModal = () => {
    setChangePassword(false);
  };

  return (
    <>
      <div className="content-backdrop fade show"></div>
      <div
        className="modal fade show"
        id="modalCenter"
        aria-modal="true"
        role="dialog"
        style={{ display: "block" }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content" ref={modalRef}>
            <div className="modal-header">
              <h5 className="modal-title" id="modalCenterTitle">
                Change Password
              </h5>
              <button
                onClick={closeModal}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="modal-body">
              <div className="row">
                <div className="row mb-3" id="bank_account_name_div">
                  <div className="row mb-3" id="bank_account_name_div">
                    <label
                      className="col-sm-2 col-form-label"
                      htmlFor="basic-default-name"
                    >
                      Password
                    </label>
                    <div className="col-sm-10">
                      <input
                        {...register("password", {
                          required: true,
                        })}
                        type="password"
                        className="form-control"
                        id="basic-default-name"
                      />
                    </div>
                  </div>
                  <div className="row mb-3" id="bank_account_name_div">
                    <label
                      className="col-sm-2 col-form-label"
                      htmlFor="basic-default-name"
                    >
                      Confirm Password
                    </label>
                    <div className="col-sm-10">
                      <input
                        {...register("confirmPassword", {
                          required: true,
                        })}
                        type="password"
                        className="form-control"
                        id="basic-default-name"
                      />
                    </div>
                  </div>

                  <div className="row mb-3" id="bank_account_name_div">
                    <label
                      className="col-sm-2 col-form-label"
                      htmlFor="basic-default-name"
                    >
                      Transaction Code
                    </label>
                    <div className="col-sm-10">
                      <input
                        {...register("mpassword", {
                          required: true,
                        })}
                        type="text"
                        className="form-control"
                        id="basic-default-name"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  onClick={closeModal}
                  type="button"
                  className="btn btn-label-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
