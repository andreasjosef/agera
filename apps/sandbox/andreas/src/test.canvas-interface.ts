import {
  type CanvasClientInterface,
  type CanvasAssignment,
  ok,
  fail,
} from "@ccpilot/domain";

const createClientInterface = (): CanvasClientInterface => {
  return {
    fetchAssignments: async (courseid: string) => {
      console.log("Fetching assignments for: ", courseid);

      const mockAssignment: CanvasAssignment = {
        id: "1234",
        title: "ChasChallenge 2026",
        description: "A long and messy list of instructions...",
        due: new Date().toString(),
      };
      return ok([mockAssignment]);
    },
    fetchCourses: async () => {
      return fail("not implemented");
    },
  };
};

const canvas = createClientInterface();

console.log(await canvas.fetchCourses());

console.log(await canvas.fetchAssignments("1234"));
