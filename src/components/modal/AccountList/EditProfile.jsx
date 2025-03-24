import { useEffect, useRef, useState } from "react";
import useCloseModalClickOutside from "../../../hooks/closeModal";
import { useForm } from "react-hook-form";
import useDownLineEdit from "../../../hooks/downLineEdit";
import { useDownLineEditForm } from "../../../hooks/downLineEditForm";
import toast from "react-hot-toast";

const EditProfile = ({ setEditProfile, editProfile, setRefetchAccount }) => {
  const [name, setName] = useState(null);
  const [changePasswordLock, setChangePasswordLock] = useState(false);
  const [favoriteMaster, setFavoriteMaster] = useState(false);
  const modalRef = useRef();
  useCloseModalClickOutside(modalRef, () => {
    closeModal();
  });
  const { register, handleSubmit } = useForm();

  const { data: downLineEditForm } = useDownLineEditForm({
    downlineId: editProfile,
    type: "editProfile",
  });
  const { mutate: changePasswordFN } = useDownLineEdit();

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      name: name,
      changePasswordLock: changePasswordLock ? 1 : 0,
      favoriteMaster: favoriteMaster ? 1 : 0,
      downlineId: editProfile,
      type: "editProfile",
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
    setEditProfile(false);
  };

  useEffect(() => {
    if (downLineEditForm?.result?.length > 0) {
      const name = downLineEditForm?.result?.[0]?.name;
      const favoriteMaster =
        downLineEditForm?.result?.[0]?.favoriteMaster === 1;
      const changePasswordLock =
        downLineEditForm?.result?.[0]?.changePasswordLock === 1;
      setName(name);
      setFavoriteMaster(favoriteMaster);
      setChangePasswordLock(changePasswordLock);
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
                Edit Profile
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
              <div className="row mb-3" id="bank_account_name_div">
                <label
                  className="col-sm-2 col-form-label"
                  htmlFor="basic-default-name"
                >
                  Full Name
                </label>
                <div className="col-sm-10">
                  <input
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    className="form-control"
                    id="basic-default-name"
                    value={name}
                  />
                </div>
              </div>
              <div className="row">
                <label
                  className="col-sm-2 col-form-label"
                  htmlFor="basic-default-name"
                >
                  Change Password Lock
                </label>
                <div className="col mb-3">
                  <label className="switch">
                    <input
                      onChange={(e) => setChangePasswordLock(e.target.checked)}
                      type="checkbox"
                      className="switch-input is-valid"
                      checked={changePasswordLock}
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
                  Favorite Master
                </label>
                <div className="col mb-3">
                  <label className="switch">
                    <input
                      onChange={(e) => setFavoriteMaster(e.target.checked)}
                      type="checkbox"
                      className="switch-input is-valid"
                      checked={favoriteMaster}
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

export default EditProfile;
