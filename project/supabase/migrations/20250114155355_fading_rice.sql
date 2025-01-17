-- SQL Server Migration

/*
  # Mesajlaşma Sistemi Şeması

  1. Yeni Tablolar
    - messages
      - id (uniqueidentifier)
      - conversation_id (nvarchar)
      - message_text (nvarchar)
      - sender_id (nvarchar)
      - created_at (datetime2)
      - is_read (bit)
*/

-- Drop existing objects
IF EXISTS (SELECT * FROM sys.security_policies WHERE name = N'MessagesSecurityPolicy')
    DROP SECURITY POLICY MessagesSecurityPolicy;
GO

IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[fn_auth_check]') AND type IN (N'FN', N'IF', N'TF'))
    DROP FUNCTION [dbo].[fn_auth_check];
GO

IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[messages]') AND type in (N'U'))
    DROP TABLE [dbo].[messages];
GO

-- Create auth check function
CREATE FUNCTION [dbo].[fn_auth_check]()
RETURNS TABLE
WITH SCHEMABINDING
AS
RETURN SELECT 1 AS fn_auth_check_result
WHERE IS_MEMBER('authenticated') = 1;
GO

-- Create messages table
CREATE TABLE [dbo].[messages] (
    [id] uniqueidentifier DEFAULT NEWID() PRIMARY KEY,
    [conversation_id] nvarchar(255) NOT NULL,
    [message_text] nvarchar(max) NOT NULL,
    [sender_id] nvarchar(255) NOT NULL,
    [created_at] datetime2 DEFAULT GETUTCDATE(),
    [is_read] bit DEFAULT 0
);
GO

-- Grant permissions
GRANT SELECT, INSERT ON [dbo].[messages] TO [authenticated];
GO

-- Enable row level security
ALTER TABLE [dbo].[messages] ENABLE SECURITY_POLICY;
GO

-- Create security policy
CREATE SECURITY POLICY [dbo].[MessagesSecurityPolicy]
    ADD FILTER PREDICATE [dbo].[fn_auth_check]() ON [dbo].[messages],
    ADD BLOCK PREDICATE [dbo].[fn_auth_check]() ON [dbo].[messages];
GO
GO