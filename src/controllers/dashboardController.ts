import { Request, Response } from "express";

export const dashboard = async (req: Request, res: Response): Promise<void> => {
  const dashboardData = {
    message: "Welcome to the Admin Dashboard!",
    stats: {
      totalUsers: 100,
      activeSessions: 25,
      lastUpdated: new Date().toISOString(),
    },
  };

  res.status(200).json(dashboardData);
};
