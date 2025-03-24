import { useEffect, useRef, useState } from "react";
import useCloseModalClickOutside from "../../../hooks/closeModal";
import { useForm } from "react-hook-form";
import { useDownLineEditForm } from "../../../hooks/downLineEditForm";
import useDownLineEdit from "../../../hooks/downLineEdit";
import toast from "react-hot-toast";
import { useBalance } from "../../../hooks/balance";

const Deposit = ({ setDeposit, deposit, setRefetchAccount }) => {
  const [amountOne, setAmountOne] = useState(null);
  const [amountTwo, setAmountTwo] = useState(null);

  const modalRef = useRef();
  useCloseModalClickOutside(modalRef, () => {
    closeModal();
  });
  const { register, handleSubmit, watch } = useForm();
  const amount = watch("amount");
  const { data: downLineEditForm } = useDownLineEditForm({
    downlineId: deposit,
    type: "balance",
  });
  const { mutate: editCreditReference } = useDownLineEdit();
  const { refetch: refetchBalance } = useBalance();

  useEffect(() => {
    if (amount?.length > 0) {
      const userOne = downLineEditForm?.result?.amount - parseFloat(amount);
      setAmountOne(userOne);
      const userTwo = downLineEditForm?.result?.amount2 + parseFloat(amount);
      setAmountTwo(userTwo);
    }
  }, [amount, downLineEditForm]);

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      downlineId: deposit,
      type: "deposit",
    };
    editCreditReference(payload, {
      onSuccess: (data) => {
        if (data?.success) {
          refetchBalance();
          setRefetchAccount((prev) => !prev);
          setDeposit(null);
        } else {
          toast.error(data?.error?.status[0]?.description);
        }
      },
    });
  };

  const closeModal = () => {
    setDeposit(false);
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
                Deposit
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
                      {downLineEditForm?.result?.userName}
                    </label>
                    <div
                      className="col-sm-10"
                      style={{ display: "flex", gap: "5px" }}
                    >
                      <input
                        disabled
                        type="text"
                        className="form-control"
                        id="basic-default-name"
                        value={downLineEditForm?.result?.amount?.toFixed(2)}
                      />
                      <input
                        disabled
                        type="text"
                        className="form-control"
                        id="basic-default-name"
                        value={
                          amountOne !== null && !isNaN(amountOne)
                            ? amountOne
                            : downLineEditForm?.result?.amount
                        }
                      />
                    </div>
                  </div>
                  <div className="row mb-3" id="bank_account_name_div">
                    <label
                      className="col-sm-2 col-form-label"
                      htmlFor="basic-default-name"
                    >
                      {downLineEditForm?.result?.userName2}
                    </label>
                    <div
                      className="col-sm-10"
                      style={{ display: "flex", gap: "5px" }}
                    >
                      <input
                        disabled
                        type="text"
                        className="form-control"
                        id="basic-default-name"
                        value={downLineEditForm?.result?.amount2?.toFixed(2)}
                      />
                      <input
                        disabled
                        type="text"
                        className="form-control"
                        id="basic-default-name"
                        value={
                          amountTwo !== null && !isNaN(amountTwo)
                            ? amountTwo
                            : downLineEditForm?.result?.amount2
                        }
                      />
                    </div>
                  </div>
                  <div className="row mb-3" id="bank_account_name_div">
                    <label
                      className="col-sm-2 col-form-label"
                      htmlFor="basic-default-name"
                    >
                      Amount
                    </label>
                    <div className="col-sm-10">
                      <input
                        {...register("amount", {
                          required: true,
                        })}
                        type="text"
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
                      Remark
                    </label>
                    <div className="col-sm-10">
                      <input
                        {...register("remark", {
                          required: true,
                        })}
                        type="text"
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

export default Deposit;
