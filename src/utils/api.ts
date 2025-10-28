const API_BASE_URL = "https://api.digitalcollege.edu.pe/api";

type RawLoginResponse = {
  mensaje: string;
  token: string;
  id: string;
  nombres: string;
  apellidos: string;
  rol_id: number;
  correo: string;
};

type RawCursoResponse = {
  id: string;
  activo: boolean;
  progress: number;
  stars: number;
  isSeen: boolean;
  versioncurso: {
    id: string;
    nombre: string;
    descripcion: string | null;
    curso: {
      id: string;
      nombre: string;
      descripcion: string | null;
      gradoId: number;
      areaId: number;
      urlPortada: string | null;
      urlVideo: string | null;
      colores?: {
        text?: string | null;
        accent?: string | null;
        primary?: string | null;
        secondary?: string | null;
        background?: string | null;
      };
      grado: {
        id: number;
        nombre: string;
        descripcion: string | null;
        nivel: {
          id: number;
          nombre: string;
          descripcion: string | null;
        };
      };
      area: {
        id: number;
        nombre: string;
        descripcion: string | null;
      };
    };
    usuarioProgresos?: Array<{
      porcentajeCompletado: string | null;
      puntosTotales: number | null;
      ultimaActividad: string | null;
    }>;
  };
};

export type DashboardUser = Pick<
  RawLoginResponse,
  "nombres" | "apellidos" | "correo"
>;

export type DashboardCourse = {
  id: string;
  title: string;
  description: string;
  area: string;
  level: string;
  grade: string;
  coverUrl: string | null;
  progress: number;
  accentColor: string;
  primaryColor: string;
  secondaryColor: string;
};

// funcion para hacer login y obtener token
async function login(): Promise<RawLoginResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/login-app`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "miguel@gmail.com",
      password: "71755767",
      rememberMe: false,
    }),
    cache: "no-store", //siempre pedir al servidor
  });

  if (!response.ok) {
    throw new Error("No fue posible autenticar al usuario.");
  }

  return response.json();
}

async function fetchCursos(token: string): Promise<RawCursoResponse[]> {
  const response = await fetch(
    `${API_BASE_URL}/versioncurso-usuarios/getByUserId`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("No fue posible obtener los cursos del usuario.");
  }

  return response.json();
}

function mapCurso(raw: RawCursoResponse): DashboardCourse {
  const {
    versioncurso: {
      id,
      descripcion,
      curso: { nombre, area, grado, colores, urlPortada },
      usuarioProgresos,
    },
  } = raw;

  const progressString = usuarioProgresos?.[0]?.porcentajeCompletado ?? "0";
  const progress = Number.parseFloat(progressString ?? "0") || 0;

  return {
    id,
    title: nombre,
    description: descripcion ?? "",
    area: area?.nombre ?? "Área sin definir",
    level: grado?.nivel?.nombre ?? "Nivel sin definir",
    grade: grado?.nombre ?? "",
    coverUrl: urlPortada,
    progress,
    accentColor: colores?.accent ?? "#f97316",
    primaryColor: colores?.primary ?? "#1d4ed8",
    secondaryColor: colores?.secondary ?? "#0f172a",
  };
}

export async function getDashboardData(): Promise<{
  user: DashboardUser;
  courses: DashboardCourse[];
}> {
  const auth = await login();
  const rawCourses = await fetchCursos(auth.token);
  return {
    user: {
      nombres: auth.nombres,
      apellidos: auth.apellidos,
      correo: auth.correo,
    },
    courses: rawCourses.map(mapCurso),
  };
}
