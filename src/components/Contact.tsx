import React from "react";
import { contactInfo } from "../data/content";

const Contact: React.FC = () => <section className="contact" id="contact"><div className="wrap"><div className="section-head"><div className="section-index">04 — CONTACT</div><div /></div><div className="contact-grid"><div><h2 className="contact-title">Have a problem<br/>worth solving?</h2><a className="contact-email" href={`mailto:${contactInfo.email}`}>{contactInfo.email} <span className="link-arrow" aria-hidden="true">↗</span></a></div><p className="contact-aside">I&apos;m currently based in {contactInfo.location}. For work, collaborations, or a thoughtful hello, <a href={`mailto:${contactInfo.email}`}>send me a note</a> and I&apos;ll get back to you.</p></div></div></section>;
export default Contact;
