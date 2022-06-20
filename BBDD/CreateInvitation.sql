SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Invitations](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[weddingDate] [datetime2](7) NOT NULL,
	[placeConvite] [nvarchar](max) NOT NULL,
	[adressConvite] [nvarchar](max) NOT NULL,
	[hourDinnerConvite] [nvarchar](max) NOT NULL,
	[transportConvite] [nvarchar](max) NOT NULL,
	[hourTransportConvite] [nvarchar](max) NOT NULL,
	[boyPhone] [nvarchar](max) NOT NULL,
	[girlPhone] [nvarchar](max) NOT NULL,
	[pinCode] [nvarchar](max) NOT NULL,
	[cityIdProvince] [int] NOT NULL,
	[coupleName] [nvarchar](max) NOT NULL,
	[idCity] [int] NOT NULL,
	[idUsuario] [int] NOT NULL,
	[usuarioId] [int] NOT NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[Invitations] ADD  CONSTRAINT [PK_Invitations] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
CREATE NONCLUSTERED INDEX [IX_Invitations_cityIdProvince] ON [dbo].[Invitations]
(
	[cityIdProvince] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
CREATE NONCLUSTERED INDEX [IX_Invitations_usuarioId] ON [dbo].[Invitations]
(
	[usuarioId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Invitations] ADD  DEFAULT ((0)) FOR [cityIdProvince]
GO
ALTER TABLE [dbo].[Invitations] ADD  DEFAULT ((0)) FOR [idCity]
GO
ALTER TABLE [dbo].[Invitations] ADD  DEFAULT ((0)) FOR [idUsuario]
GO
ALTER TABLE [dbo].[Invitations] ADD  DEFAULT ((0)) FOR [usuarioId]
GO
ALTER TABLE [dbo].[Invitations]  WITH CHECK ADD  CONSTRAINT [FK_Invitations_provinces_cityIdProvince] FOREIGN KEY([cityIdProvince])
REFERENCES [dbo].[provinces] ([IdProvince])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Invitations] CHECK CONSTRAINT [FK_Invitations_provinces_cityIdProvince]
GO
ALTER TABLE [dbo].[Invitations]  WITH CHECK ADD  CONSTRAINT [FK_Invitations_Users_usuarioId] FOREIGN KEY([usuarioId])
REFERENCES [dbo].[Users] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Invitations] CHECK CONSTRAINT [FK_Invitations_Users_usuarioId]
GO
