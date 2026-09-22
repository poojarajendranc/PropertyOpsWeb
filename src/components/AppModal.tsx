import "./AppModal.css"
interface ModalProps {
    readonly isOpen: boolean;
    readonly onClose: () => void;
    readonly children: React.ReactNode;
    readonly title: string;
}

function AppModal({
    isOpen,
    onClose,
    children,
    title,
}: ModalProps) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h2>{title}</h2>
                    <button onClick={onClose}>X</button>
                </div>

                {children}
            </div>
        </div>
    );
}

export default AppModal;