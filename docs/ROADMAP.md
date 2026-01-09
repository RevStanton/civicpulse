# CivicPulse — MVP Roadmap & Backlog
_Last updated: 2026-01-09_

CivicPulse is an anonymous, verifiable public-opinion platform designed to provide a transparent, real-time “pulse” of the people.

This roadmap defines what is included in the **Minimum Viable Product (MVP)**, what is complete, what is pending, and what belongs in the backlog for future iterations.

---

## I. MVP Scope & Status

### MVP Summary
The MVP includes:
- One active civic question at a time  
- Persistent vote storage using Cloudflare Workers KV  
- Anonymous voting with verifiable receipts  
- Basic anti-abuse protections  
- Simple visual results  
- Clean, minimal UI  
- Cloudflare deployment  

Below is the authoritative MVP status.

---

### 1. Single Active Question
**Status:** Not Started  
Store active question text in KV (`current-question`).  
Frontend loads this dynamically.  

---

### 2. Persistent Storage (Cloudflare KV)
**Status:** Complete  
Votes and tallies stored in KV with fallback to memory during local dev.

---

### 3. Question-Scoped Ledger (Historical Support)
**Status:** Not Started  
Prefix all vote keys with a question ID:  
- `vote:<questionId>:<receipt>`  
- `tallies:<questionId>`  

Enables future historical dashboards.

---

### 4. Receipt Verification
**Status:** Complete  
Verify votes using receipt codes stored in KV.

---

### 5. One Vote Per Device (Anonymous Device ID)
**Status:** Not Started  
Generate anonymous device ID stored in cookie/localStorage.  
Check KV before allowing a vote.

---

### 6. Soft IP Rate Limiting
**Status:** Not Started  
Use Cloudflare `CF-Connecting-IP` header to limit rapid repeat votes.

---

### 7. Results Visualization (Bar Chart)
**Status:** Not Started  
Replace raw tallies with a simple bar chart.

---

### 8. UI/UX Cleanup
**Status:** Partially Complete  
General visual polish, spacing, and structure improvements.

---

## II. MVP Feature Table

| Feature | Status | Priority | Description |
|--------|--------|----------|-------------|
| Single Active Question | Not Started | High | Load question text from KV |
| Persistent Storage (KV) | Complete | High | Stable vote ledger |
| Question-Scoped Ledger | Not Started | High | Supports historical data |
| Receipt Verification | Complete | High | Lookup vote via receipt |
| One Vote Per Device | Not Started | High | Prevent duplicate votes |
| IP Rate Limiting | Not Started | High | Basic anti-abuse |
| Results Visualization | Not Started | Medium | Bar chart |
| UI/UX Cleanup | Partial | Medium | Improve layout |

---

## III. MVP Completion Checklist

### Core Logic
- [x] Cloudflare Pages deployment
- [x] KV persistent storage
- [ ] Single active question logic
- [ ] Question ID → prefix for vote keys
- [x] Receipt verification
- [ ] One vote per device
- [ ] IP-based throttling

### Frontend
- [ ] Dynamic question display
- [ ] Bar chart visualization
- [ ] UX refinements

### Stability & Integrity
- [x] Local dev fallback
- [ ] Abuse mitigation

---

## IV. Backlog (Post-MVP)

### A. Admin & Governance
- Admin UI to change/rotate questions  
- Passwordless admin login  
- Scheduled questions  

### B. Multi-Question Support
- Multiple active questions  
- Categories  
- Batches / poll groups  

### C. Public History & Transparency
- Historical questions dashboard  
- Public ledger explorer  
- Export past question data  

### D. Advanced Anti-Abuse
- Cloudflare Turnstile  
- Device fingerprinting  
- Voter risk scoring  
- Pattern detection  

### E. Advanced Visualizations
- Animated charts  
- Donut charts  
- Trend lines  
- Time-series vote progression  

### F. Live Updates
- Server-sent events (SSE)  
- Realtime results page  

### G. Social & Sharing
- Shareable receipts  
- Social preview cards  
- Embeddable widgets  

### H. UI/Brand
- Dark mode  
- Branding system  
- Typography and color themes  

---

## V. Feature Decision Criteria

All new ideas must answer:
1. Does this belong in MVP?  
2. Does this improve transparency or trust?  
3. Does this add unnecessary friction?  
4. Does this need to wait until after stability?  

---

## VI. Next Steps

Choose next implementation focus:
- Option A — Question model (recommended)  
- Option B — Anti-abuse layer  
- Option C — Visualization layer  
- Option D — UX polish  

---

