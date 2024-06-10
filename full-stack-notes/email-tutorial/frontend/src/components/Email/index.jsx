/**
 * Html template that we plan to render server-side. 
 * So once you've finalized this, you'll wrap this in html, body, head, etc.
 * Add the styles in the header
 * 
 */
import "./styles.module.css";

export default function EmailPage() {
    return (
        <div>
            <header style={{ backgroundColor: '#003399', color: '#E5EAF5', textAlign: 'center', padding: '20px 0', fontWeight: '700', fontSize: '24px' }}>
                <h1 style={{ fontSize: '28px' }}>BlogSphere.com</h1>
                <div>
                    <img src="https://cdn.templates.unlayer.com/assets/1597218650916-xxxxc.png" alt="BlogSphere Logo" style={{ width: '125px' }} />
                    <p style={{ textTransform: "uppercase", fontSize: "20px", marginBottom: "12px" }}>Thanks for signing up!</p>
                    <span>Verify Your E-mail Address</span>
                </div>
            </header>

            <main>
                <section style={{ padding: '20px 50px', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: '500', marginBottom: '10px' }}>Hi,</h2>
                    <p style={{ width: "80%", margin: "0 auto" }}>You are almost ready to get started. Please click on the button below to verify your email address and enjoy exclusive services with us!</p>

                    <button style={{ backgroundColor: '#FF6600', color: '#FFFFFF', border: 'none', padding: '12px 24px', fontWeight: '600', borderRadius: '6px', fontSize: '16px', marginTop: '36px', marginBottom: "36px", textTransform: "uppercase" }}>Verify Your Email</button>

                    <p style={{ fontWeight: '500', marginTop: '24px' }}>Thanks,<br />The BlogSphere Team</p>
                </section>

                <section style={{ backgroundColor: '#E5EAF5', padding: '20px' }}>
                    <div style={{ textAlign: 'center', padding: '20px' }}>
                        <p style={{ fontWeight: '700', fontSize: '20px', marginBottom: '8px' }}>Get in touch</p>
                        <p style={{ marginBottom: '0px', fontWeight: '500' }}>+1 123 456-7890</p>
                        <p style={{ marginTop: '0px', fontWeight: '500' }}>Info@YourCompany.com</p>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', columnGap: '12px' }}>
                        <a href="#"><img src="https://cdn.tools.unlayer.com/social/icons/circle-black/linkedin.png" alt="LinkedIn" style={{ width: '30px' }} /></a>
                        <a><img src="https://cdn.tools.unlayer.com/social/icons/circle-black/facebook.png" alt="Facebook" style={{ width: '30px' }} /></a>
                        <a><img src="https://cdn.tools.unlayer.com/social/icons/circle-black/instagram.png" alt="Instagram" style={{ width: '30px' }} /></a>
                        <a><img src="https://cdn.tools.unlayer.com/social/icons/circle-black/youtube.png" alt="YouTube" style={{ width: '30px' }} /></a>
                        <a><img src="https://cdn.tools.unlayer.com/social/icons/circle-black/email.png" alt="Email" style={{ width: '30px' }} /></a>
                    </div>
                </section>
            </main>

            <footer style={{ backgroundColor: '#003399', color: '#E5EAF5', textAlign: 'center', padding: '12px 0', fontSize: '12px' }}>
                <p>&copy; BlogSphere — Knguyen-Dev. All Rights Reserved.</p>
            </footer>
        </div>
    );
}
