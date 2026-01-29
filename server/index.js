import jsonServer from "json-server";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbFile = path.join(__dirname, "..", "db.json");

const server = jsonServer.create();
const router = jsonServer.router(dbFile);
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

server.get("/advisor/recommendations/:studentId", (req, res) => {
  const { studentId } = req.params;
  const semester = String(req.query.semester ?? "1");

  const students = router.db.get("students").value();
  const courses = router.db.get("courses").value();
  const selections = router.db.get("selections").value();
  const settings = router.db.get("settings").value() ?? {
    restrictedMinCgpa: 4.0,
    maxUnitsPerSemester: 24,
  };

  const student = students.find(
    (item) => String(item.id) === String(studentId),
  );

  if (!student) {
    res.status(404).json({ message: "Student not found" });
    return;
  }

  const levelMatch = String(student.level ?? "").match(/\d+/);
  const studentLevel = levelMatch ? levelMatch[0] : null;
  const selectedCodes = new Set(
    selections.map((item) => String(item.code)),
  );

  const recommendations = courses.filter((course) => {
    if (studentLevel && String(course.level) !== studentLevel) return false;
    if (String(course.semester) !== semester) return false;
    if (selectedCodes.has(String(course.code))) return false;
    if (
      course.restricted &&
      Number(student.cgpa ?? 0) < Number(settings.restrictedMinCgpa)
    ) {
      return false;
    }
    return true;
  });

  const totalUnits = recommendations.reduce(
    (sum, course) => sum + Number(course.units ?? 0),
    0,
  );

  res.json({
    studentId: String(studentId),
    semester,
    recommendations,
    rules: settings,
    totalUnits,
  });
});

server.use(router);

const port = Number(process.env.PORT ?? 4000);
server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`API server running on http://localhost:${port}`);
});
