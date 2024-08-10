import React from "react";
import { ColorRing } from "react-loader-spinner";

const Loading = ({ loading, error, children }) => {
    const elementType = children?.type;

    const renderHandler = () => {
        if (elementType === "button") {
            const cloneButton = React.cloneElement(
                children,
                { disabled: loading },
                loading ? "Loading..." : children.props.children
            );
            return (
                <>
                    {cloneButton}
                    {error && error.message && (
                        <p className="text-red-500 text-xs mt-2">
                            <br />
                            {error.message.toString() === "invalid user name or pass" ? "Invalid username or password" : error.message.toString()}
                        </p>
                    )}
                </>
            );
        }
        return (
            <>
                {loading ? (
                    <div className="flex flex-col justify-center items-center">
                        <ColorRing
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="color-ring-loading"
                            wrapperStyle={{}}
                            wrapperClass="color-ring-wrapper"
                            colors={['#0ea5e9', '#0ea5e9', '#0ea5e9', '#0ea5e9', '#0ea5e9']}
                        />
                    </div>
                ) : error && error.message ? (
                    <p>{error.message.toString()}</p>
                ) : (
                    children
                )}
            </>
        );
    };

    return renderHandler();
};

export default Loading;
