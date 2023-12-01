import Modal from "components/Modal";
import { ICaseCategory } from "interfaces/case";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { emptyFunction } from "scripts/helpers";
import "./CaseCategoriesModal.scss";

interface CaseCategoriesModalProps {
  visible?: boolean;
  closeModal?: () => void;
  categories?: ICaseCategory[];
}

const CaseCategoriesModal: FC<CaseCategoriesModalProps> = ({
  closeModal = emptyFunction,
  visible = false,
  categories = [],
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      {...{ visible }}
      className="case-categories-modal"
      centered
      destroyOnClose
      bodyStyle={{ padding: 0 }}
      title={t("Categories")}
      onCancel={closeModal}
      width={640}
      showFooter={false}
    >
      <div className="case-categories-modal__wrapper">
        {categories?.map((category: ICaseCategory, index: number) => {
          return (
            <div key={index} className="case-categories-modal__category py-2">
              <div className="case-categories-modal__category-name sm_body_b1_reg text-gray800 py-2">
                {category.name}
              </div>
            </div>
          );
        })}
      </div>
    </Modal>
  );
};

export default CaseCategoriesModal;
