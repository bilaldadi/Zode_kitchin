export function LoadingSpinner() {
    return (
        <div style={{ margin: '10rem 0' }}>
            <div className="lds-ripple">
                <div></div>
                <div></div>
            </div>
        </div>
    );
}