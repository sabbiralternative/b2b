import { useEffect, useRef, useState } from "react";
import useCloseModalClickOutside from "../../../hooks/closeModal";
import { useForm } from "react-hook-form";
import useDownLineEdit from "../../../hooks/downLineEdit";
import { useDownLineEditForm } from "../../../hooks/downLineEditForm";
import toast from "react-hot-toast";

const UserLock = ({ setUserLock, userLock, setRefetchAccount }) => {
  const [userLockWatch, setUserLockWatch] = useState(false);
  const [betLockWatch, setBetLockWatch] = useState(false);
  const modalRef = useRef();
  useCloseModalClickOutside(modalRef, () => {
    closeModal();
  });
  const { register, handleSubmit } = useForm();

  const { data: downLineEditForm } = useDownLineEditForm({
    downlineId: userLock,
    type: "userLock",
  });
  const { mutate: changePasswordFN } = useDownLineEdit();

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      betLock: betLockWatch ? 1 : 0,
      userLock: betLockWatch ? 1 : 0,
      downlineId: userLock,
      type: "userLock",
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
    setUserLock(false);
  };

  useEffect(() => {
    if (downLineEditForm?.result?.length > 0) {
      const userLock = downLineEditForm?.result?.[0]?.userLock === 1;
      const betLock = downLineEditForm?.result?.[0]?.betLock === 1;
      setUserLockWatch(userLock);
      setBetLockWatch(betLock);
    }
  }, [downLineEditForm]);

  if (!downLineEditForm?.result) {
    return null;
  }

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
                User Lock
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
                <label
                  className="col-sm-2 col-form-label"
                  htmlFor="basic-default-name"
                >
                  Bet Lock
                </label>
                <div className="col mb-3">
                  <label className="switch">
                    <input
                      onChange={(e) => setBetLockWatch(e.target.checked)}
                      type="checkbox"
                      className="switch-input is-valid"
                      checked={betLockWatch}
                    />
                    <span className="switch-toggle-slider">
                      <span className="switch-on"></span>
                      <span className="switch-off"></span>
                    </span>
                  </label>
                </div>
              </div>
              <div className="row">
                <label
                  className="col-sm-2 col-form-label"
                  htmlFor="basic-default-name"
                >
                  User Lock
                </label>
                <div className="col mb-3">
                  <label className="switch">
                    <input
                      onChange={(e) => setUserLockWatch(e.target.checked)}
                      type="checkbox"
                      className="switch-input is-valid"
                      checked={userLockWatch}
                    />
                    <span className="switch-toggle-slider">
                      <span className="switch-on"></span>
                      <span className="switch-off"></span>
                    </span>
                  </label>
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

export default UserLock;
