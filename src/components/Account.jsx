export function Account() {
    return (
        <div className="cart-page-container">
        <h2>User Details</h2>
        <form className="user-form">
            <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" placeholder="Enter your name"/>
            </div>
            <div className="form-group">
                <label htmlFor="office">Office Number:</label>
                <select id="office" name="office">
                    <option value="">Select Office</option>
                    <option value="01">01 - CEO</option>
                    <option value="02">02 - CFO</option>
                    <option value="03">03 - COO</option>
                    <option value="04">04 - CTO</option>
                    <option value="05">05 - IT</option>
                    <option value="06">06 - Finance</option>
                    <option value="07">07 - meeting Room</option>
                    <option value="08">08 - Supply chain</option>
                    <option value="09">09 - comercial</option>
                    <option value="10">10 - HR</option>
                    <option value="11">11 - test</option>
                    <option value="12">12 - test</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="phone">Phone Number:</label>
                <input type="tel" id="phone" name="phone" placeholder="Enter your phone number"/>
            </div>
        </form>
    </div>
    );
}