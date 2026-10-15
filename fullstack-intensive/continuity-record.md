# Engineering Training Continuity Record

**Program:** 6-Week Full-Stack Engineering Intensive

**Current phase:** BizFlow M3 (Mongo + auth) code complete; local Docker Hub timed out  
**Active project:** BizFlow (`projects/bizflow`)  
**Current milestone:** **M3 done in code**; verify when Mongo is reachable  
**Next:** M4 Products + Orders  

**Blocked locally (network):** `docker pull mongo:7` / some npm fetches timed out.  
**CI:** GitHub Actions uses a Mongo service — will validate auth smoke on push.  

**Run when Mongo is up:**
```bash
cd projects/bizflow
npm run dev:mongo   # or any Mongo on :27017
npm run dev
```

**GitHub:** https://github.com/binitabab/fullstack-intensive  
